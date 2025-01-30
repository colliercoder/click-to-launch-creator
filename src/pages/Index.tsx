import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ElementorElement, createElementorData, generateElementId } from '@/utils/elementorUtils';
import { generateWebsiteContent } from '@/utils/openAIService';
import { Layers, Download, Plus, Loader2 } from 'lucide-react';
import WebsiteChat from '@/components/WebsiteChat';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const [elements, setElements] = useState<ElementorElement[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);

  const addSection = () => {
    const newSection: ElementorElement = {
      id: generateElementId(),
      elType: 'section',
      settings: {
        layout: 'full_width',
        gap: 'no'
      },
      elements: [{
        id: generateElementId(),
        elType: 'column',
        settings: {
          _column_size: 100
        },
        elements: []
      }]
    };
    setElements([...elements, newSection]);
  };

  const exportData = () => {
    const elementorData = createElementorData(elements);
    const dataStr = JSON.stringify(elementorData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'elementor-template.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Your template has been exported. You can now import it into WordPress using the Elementor template import feature.",
    });
  };

  const handleChatMessage = async (message: string) => {
    setIsProcessing(true);
    setShowProcessing(true);
    try {
      const generatedContent = await generateWebsiteContent(message);
      
      // Here we would parse the AI response and create appropriate sections
      // For now, we'll just add a basic section
      addSection();
      
      toast({
        title: "Website Generated",
        description: "Your website has been created! You can now make additional changes or export to WordPress.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error generating your website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setShowProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto p-8">
        <Card className="p-6 shadow-lg border-t-4 border-primary">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Landing Page Builder
              </h1>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => addSection()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Section
              </Button>
              <Button
                onClick={exportData}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export to WordPress
              </Button>
            </div>
          </div>

          <div className="bg-white border rounded-lg min-h-[500px] p-4 shadow-inner">
            {elements.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[500px] text-gray-400">
                <Layers className="w-12 h-12 mb-2" />
                <p>Describe the website you want to create using the chat below</p>
              </div>
            ) : (
              <div className="space-y-4">
                {elements.map((element) => (
                  <div
                    key={element.id}
                    className="border-2 border-dashed border-gray-200 p-4 rounded hover:border-primary/30 transition-colors"
                  >
                    Section {element.id}
                  </div>
                ))}
              </div>
            )}
          </div>

          <WebsiteChat 
            onMessageSend={handleChatMessage}
            isLoading={isProcessing}
          />
        </Card>
      </div>

      <AlertDialog open={showProcessing}>
        <AlertDialogContent className="flex flex-col items-center">
          <AlertDialogHeader>
            <AlertDialogTitle>Generating Your Website</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Please wait while we create your website...</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
