export interface ElementorElement {
  id: string;
  elType: 'widget' | 'section' | 'column';
  settings: Record<string, any>;
  elements: ElementorElement[];
}

export interface ElementorData {
  version: string;
  title: string;
  type: string;
  content: ElementorElement[];
}

export const createElementorData = (elements: ElementorElement[]): ElementorData => {
  return {
    version: '3.12.0',
    title: 'Landing Page',
    type: 'page',
    content: elements
  };
};

export const generateElementId = () => {
  return Math.random().toString(36).substr(2, 9);
};