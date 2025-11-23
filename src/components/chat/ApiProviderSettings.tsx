import { useApiKey } from "@/hooks/useApiKey";
import { useCustomUrl } from "@/hooks/useCustomUrl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { providers } from "@/lib/providers";
import { useProvider } from "@/hooks/useProvider";
import { useModel } from "@/hooks/useModel";
import { useModels } from "@/hooks/useModels";

export function ApiProviderSettings() {
	const { getApiKey, saveApiKey, removeApiKey } = useApiKey();
	const { customUrl, saveCustomUrl, removeCustomUrl } = useCustomUrl();
	const { provider, saveProvider } = useProvider();
	const { model, saveModel } = useModel();

	const currentApiKey = getApiKey(provider);
	const { models, isLoading, error } = useModels(provider, currentApiKey);

	const [localApiKey, setLocalApiKey] = useState(currentApiKey || "");
	const [localCustomUrl, setLocalCustomUrl] = useState(customUrl || "");
	const [localCustomModel, setLocalCustomModel] = useState(model || "");

	const selectedProvider = providers.find((p) => p.id === provider);
	const showCustomUrl = selectedProvider?.requiresCustomUrl;

	useEffect(() => {
		setLocalApiKey(currentApiKey || "");
	}, [currentApiKey]);

	useEffect(() => {
		setLocalCustomUrl(customUrl || "");
	}, [customUrl]);

	const handleSaveApiKey = () => {
		if (localApiKey.trim()) {
			saveApiKey(provider, localApiKey.trim());
		}
	};

	const handleRemoveApiKey = () => {
		removeApiKey(provider);
		setLocalApiKey("");
	};

	const handleSaveCustomUrl = () => {
		if (localCustomUrl.trim()) {
			saveCustomUrl(localCustomUrl.trim());
		}
	};

	const handleProviderChange = (newProvider: string) => {
		saveProvider(newProvider);
		const newProviderApiKey = getApiKey(newProvider);
		setLocalApiKey(newProviderApiKey || "");
	};

	return (
		<div className="p-4 border-b space-y-4">
			<div>
				<Label htmlFor="provider">API Provider</Label>
				<Select value={provider} onValueChange={handleProviderChange}>
					<SelectTrigger id="provider">
						<SelectValue placeholder="Select a provider" />
					</SelectTrigger>
					<SelectContent>
						{providers.map((p) => (
							<SelectItem key={p.id} value={p.id}>
								{p.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{showCustomUrl && (
				<div>
					<Label htmlFor="custom-url">Base URL</Label>
					<div className="flex gap-2 mt-1">
						<Input
							id="custom-url"
							type="text"
							value={localCustomUrl}
							onChange={(e) => setLocalCustomUrl(e.target.value)}
							placeholder="https://api.example.com/v1"
						/>
						<Button onClick={handleSaveCustomUrl}>Save</Button>
						<Button onClick={removeCustomUrl} variant="destructive">
							Remove
						</Button>
					</div>
				</div>
			)}

			<div>
				<Label htmlFor="api-key">API Key</Label>
				<div className="flex gap-2 mt-1">
					<Input
						id="api-key"
						type="password"
						value={localApiKey}
						onChange={(e) => setLocalApiKey(e.target.value)}
						placeholder="Enter your API key"
					/>
					<Button onClick={handleSaveApiKey}>Save</Button>
					<Button onClick={handleRemoveApiKey} variant="destructive">
						Remove
					</Button>
				</div>
				{selectedProvider?.apiKeyUrl && (
					<p className="text-xs text-muted-foreground mt-1">
						Get your API key at:{" "}
						<a
							href={selectedProvider.apiKeyUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:text-foreground"
						>
							{selectedProvider.apiKeyUrl}
						</a>
					</p>
				)}
			</div>

			<div>
				<Label htmlFor="model">Model</Label>
				{showCustomUrl ? (
					<Input
						id="model"
						type="text"
						value={localCustomModel}
						onChange={(e) => {
							setLocalCustomModel(e.target.value);
							saveModel(e.target.value);
						}}
						placeholder="gpt-4o-mini"
						disabled={!currentApiKey || !customUrl}
					/>
				) : (
					<Select
						value={model}
						onValueChange={saveModel}
						disabled={isLoading || !currentApiKey}
					>
						<SelectTrigger id="model">
							<SelectValue placeholder="Select a model" />
						</SelectTrigger>
						<SelectContent>
							{isLoading && (
								<SelectItem value="loading" disabled>
									Loading models...
								</SelectItem>
							)}
							{error && (
								<SelectItem value="error" disabled>
									Error loading models
								</SelectItem>
							)}
							{models.map((m) => (
								<SelectItem key={m.id} value={m.id}>
									{m.name || m.id}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			</div>
		</div>
	);
}
