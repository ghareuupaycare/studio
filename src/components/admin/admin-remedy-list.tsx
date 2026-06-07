'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown, ChevronRight, ClipboardList, Pencil, Trash2, ExternalLink 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AdminRemedyListProps {
  groupedRecipes: Record<string, Record<string, any[]>>;
  onEdit: (recipe: any) => void;
  onDelete: (e: React.MouseEvent, id: string, title: string) => void;
}

export const AdminRemedyList = ({ groupedRecipes, onEdit, onDelete }: AdminRemedyListProps) => {
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedDisease, setExpandedDisease] = useState<string | null>(null);

  const toggleCategory = (cat: string) => {
    setExpandedCategory(expandedCategory === cat ? null : cat);
    setExpandedDisease(null);
  };

  const toggleDisease = (dis: string) => {
    setExpandedDisease(expandedDisease === dis ? null : dis);
  };

  return (
    <Card className="border-primary/10 overflow-hidden shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="text-lg flex items-center gap-2"><ClipboardList className="w-5 h-5 text-primary" /> सभी लाइव नुस्खे</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {Object.keys(groupedRecipes).length > 0 ? (
          <div className="space-y-3">
            {Object.entries(groupedRecipes).map(([category, diseases]) => (
              <div key={category} className="border rounded-xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 transition-colors font-bold text-primary"
                >
                  <div className="flex items-center gap-3">
                    {expandedCategory === category ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    {category}
                  </div>
                  <span className="bg-primary/20 text-primary px-3 py-0.5 rounded-full text-xs">
                    {Object.values(diseases).flat().length}
                  </span>
                </button>
                
                {expandedCategory === category && (
                  <div className="bg-white divide-y">
                    {Object.entries(diseases).map(([disease, recipes]) => (
                      <div key={disease} className="pl-4">
                        <button 
                          onClick={() => toggleDisease(disease)}
                          className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors font-medium text-slate-700"
                        >
                          <div className="flex items-center gap-3">
                            {expandedDisease === disease ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            {disease}
                          </div>
                          <span className="text-xs text-muted-foreground">{recipes.length}</span>
                        </button>
                        
                        {expandedDisease === disease && (
                          <div className="bg-slate-50/50 divide-y border-t">
                            {recipes.map((recipe) => (
                              <div key={recipe.id} className="p-4 flex items-center justify-between group">
                                <div className="flex-1">
                                  <h4 className="font-bold text-primary flex items-center gap-2">
                                    {recipe.remedyTitle?.hi || 'Untitled'}
                                    <button 
                                      onClick={() => router.push(`/?remedyId=${recipe.id}`)}
                                      className="p-1 rounded hover:bg-primary/10 text-primary/40 hover:text-primary transition-colors"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                    </button>
                                  </h4>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => onEdit(recipe)}
                                    className="text-blue-600 hover:bg-blue-50"
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={(e) => onDelete(e, recipe.id, recipe.remedyTitle?.hi)}
                                    className="text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground italic">अभी कोई डेटा नहीं है।</div>
        )}
      </CardContent>
    </Card>
  );
};
