import type { UIMessage } from "@ai-sdk/react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useApiKey } from "@/hooks/useApiKey";
import { useCustomUrl } from "@/hooks/useCustomUrl";
import { useModel } from "@/hooks/useModel";
import { useProvider } from "@/hooks/useProvider";
import { ApiProviderSettings } from "./ApiProviderSettings";
import { InputBar } from "./InputBar";
import { MessageList } from "./MessageList";

interface ChatInterfaceProps {
	conversationId: string;
	fromNodeId?: string;
	forkingFromPrompt?: string;
}

export function ChatInterface({
	conversationId,
	forkingFromPrompt,
}: ChatInterfaceProps) {
	const { getApiKey } = useApiKey();
	const { provider } = useProvider();
	const { model } = useModel();
	const { customUrl } = useCustomUrl();
	const [messages, setMessages] = useState<UIMessage[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const currentApiKey = getApiKey(provider);

	const handleSend = async (text: string) => {
		if (!currentApiKey) {
			return;
		}

		const userMessage: UIMessage = {
			id: Date.now().toString(),
			role: "user",
			parts: [{ type: "text", text }],
		};

		setMessages((prev) => [...prev, userMessage]);
		setIsLoading(true);

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					messages: messages
						.map((m) => ({
							role: m.role,
							content: m.parts
								.map((p) => (p.type === "text" ? p.text : ""))
								.join(""),
						}))
						.concat([
							{
								role: "user",
								content: text,
							},
						]),
					provider,
					apiKey: currentApiKey,
					model,
					customUrl,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to get response");
			}

			const reader = response.body?.getReader();
			if (!reader) {
				throw new Error("No response body");
			}

			const decoder = new TextDecoder();
			const assistantMessage: UIMessage = {
				id: (Date.now() + 1).toString(),
				role: "assistant",
				parts: [{ type: "text", text: "" }],
			};

			setMessages((prev) => [...prev, assistantMessage]);

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value);
				if (assistantMessage.parts[0].type === "text") {
					assistantMessage.parts[0].text += chunk;
				}
				setMessages((prev) => [...prev.slice(0, -1), { ...assistantMessage }]);
			}
		} catch (error) {
			console.error("Error sending message:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col h-screen overflow-auto">
			{/* Header with sidebar trigger and fork indicator */}
			<div className="border-b bg-background/80 backdrop-blur-sm">
				<div className="flex items-center gap-2 px-4 py-2">
					<SidebarTrigger />
					{forkingFromPrompt && (
						<Badge variant="secondary" className="text-xs">
							Forking from: {forkingFromPrompt.slice(0, 50)}
							{forkingFromPrompt.length > 50 ? "..." : ""}
						</Badge>
					)}
				</div>
			</div>

			<ApiProviderSettings />

			{/* Messages */}
			<MessageList messages={messages} isLoading={isLoading} />

			{/* Input */}
			<div className="border-t border-border/30 bg-background p-4">
				<div className="max-w-3xl mx-auto">
					<InputBar
						onSend={handleSend}
						isLoading={isLoading}
						placeholder="Message Synapse"
						disabled={!currentApiKey}
					/>
				</div>
			</div>
		</div>
	);
}
