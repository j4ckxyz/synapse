import { createFileRoute } from "@tanstack/react-router";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { AppSidebar } from "@/components/navigation/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/chat/$id")({
	component: ChatPage,
});

function ChatPage() {
	const { id } = Route.useParams();

	return (
		<SidebarProvider defaultOpen={false}>
			<AppSidebar />
			<SidebarInset>
				<ChatInterface conversationId={id} />
			</SidebarInset>
		</SidebarProvider>
	);
}
