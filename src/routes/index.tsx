import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	const navigate = useNavigate();

	const handleNewConversation = () => {
		const newId = crypto.randomUUID();
		navigate({
			to: "/chat/$id",
			params: { id: newId },
		});
	};

	return (
		<div className="min-h-screen overflow-y-auto bg-background">
			<div className="container mx-auto px-4 py-12">
				<div className="mb-12 flex items-center justify-between">
					<div>
						<h1 className="text-5xl font-bold mb-3 text-foreground">
							Welcome to Synapse
						</h1>
						<p className="text-muted-foreground text-lg">
							Start a new chat with AI - bring your own API key
						</p>
					</div>
					<Button
						onClick={handleNewConversation}
						size="lg"
						className="gap-2 shadow-lg"
					>
						<MessageSquare className="h-5 w-5" />
						Start Chat
					</Button>
				</div>
			</div>
		</div>
	);
}
