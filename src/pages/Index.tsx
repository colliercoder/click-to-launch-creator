import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ElementorElement, createElementorData, generateElementId } from '@/utils/elementorUtils';
import { Layers, Download, Plus } from 'lucide-react';

const Index = () => {
  const [elements, setElements] = useState<ElementorElement[]>([]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">Landing Page Builder</h1>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={addSection}
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

          <div className="bg-white border rounded-lg min-h-[500px] p-4">
            {elements.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[500px] text-gray-400">
                <Layers className="w-12 h-12 mb-2" />
                <p>Click "Add Section" to start building your landing page</p>
              </div>
            ) : (
              <div className="space-y-4">
                {elements.map((element) => (
                  <div
                    key={element.id}
                    className="border-2 border-dashed border-gray-200 p-4 rounded"
                  >
                    Section {element.id}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;