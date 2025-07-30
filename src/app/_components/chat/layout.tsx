import { ArtifactProvider, SplitViewLayout, ArtifactViewer, useArtifacts } from '@/components/artifacts';

interface Props {
  children: React.ReactNode;
  chatId?: string;
}

function ChatLayoutContent({ children }: { children: React.ReactNode }) {
  const { activeArtifact, isArtifactPanelOpen, closeArtifact } = useArtifacts();

  return (
    <SplitViewLayout
      chatContent={children}
      artifactContent={
        activeArtifact ? (
          <ArtifactViewer
            artifact={activeArtifact}
            isEditable={true}
          />
        ) : null
      }
      isArtifactOpen={isArtifactPanelOpen}
      onCloseArtifact={closeArtifact}
      className="h-full"
    />
  );
}

export const ChatLayout: React.FC<Props> = ({ children, chatId }) => {
  return (
    <div className="flex h-0 flex-1 flex-col overflow-hidden">
      <ArtifactProvider chatId={chatId}>
        <ChatLayoutContent>{children}</ChatLayoutContent>
      </ArtifactProvider>
    </div>
  );
};
