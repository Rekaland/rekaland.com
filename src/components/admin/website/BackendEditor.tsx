import React from 'react';

interface BackendEditorProps {
  onConfigChange?: () => void;
}

const BackendEditor: React.FC<BackendEditorProps> = ({ onConfigChange }) => {
  // This component would contain the actual backend editor code
  // For now, we're just making it accept the onConfigChange prop
  return <div>Backend Editor Component</div>;
};

export default BackendEditor;
