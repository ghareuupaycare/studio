
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown, ChevronRight, ClipboardList, Pencil, Trash2, ExternalLink, Plus 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AdminRemedyListProps {
  groupedRecipes: Record<string, Record<string, any[]>>;
  onEdit: (recipe: any) => void;
  onDelete: (e: React.MouseEvent, id: string, title: string) => void;
  onDeleteCategory: (categoryName: string) => void;
  onDeleteSubCategory: (categoryName: string, diseaseName: string) => void;
  onQuickAdd: (category?: any, disease?: any) => void;
  isNight?: boolean;
}

export const AdminRemedyList = ({ 
  groupedRecipes, 
  onEdit, 
  onDelete, 
  onDeleteCategory,
  onDeleteSubCategory,
  onQuickAdd,
  isNight = false
}: AdminRemedyListProps) => {
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
    <Card className={cn("overflow-hidden rounded-[2.5rem]", isNight ? "bg-zinc-900 border-white/10" : "bg-white border-primary/10 shadow-lg")}>
      <CardHeader className={cn("border-b", isNight ? "bg-zinc-800 border-white/10" : "bg-primary/5")}>
        <CardTitle className="text-lg flex items-center gap-2">
          <ClipboardList className={cn("w-5 h-5", isNight ? "text-accent" : "text-primary")} /> 
          सभी लाइव नुस्खे
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {Object.keys(groupedRecipes).length > 0 ? (
          <div className="space-y-3">
            {Object.entries(groupedRecipes).map(([category, diseases]) => {
              const firstCatRecipe = Object.values(diseases)[0][0];
              const diseaseCount = Object.keys(diseases).length;
              
              return (
                <div key={category} className={cn("border rounded-xl overflow-hidden shadow-sm", isNight ? "border-white/5" : "")}>
                  <div className={cn("flex items-center transition-colors", isNight ? "bg-zinc-800 hover:bg-zinc-700/50" : "bg-primary/5 hover:bg-primary/10")}>
                    <button 
                      onClick={() => toggleCategory(category)}
                      className={cn("flex-1 flex items-center gap-3 p-4 font-bold text-left", isNight ? "text-zinc-100" : "text-primary")}
                    >
                      {expandedCategory === category ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      {category}
                      <span className={cn("px-3 py-0.5 rounded-full text-xs ml-2", isNight ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary")}>
                        {diseaseCount} {diseaseCount === 1 ? 'बीमारी' : 'बीमारियां'}
                      </span>
                    </button>
                    <div className="flex items-center gap-1 mr-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickAdd(firstCatRecipe.mainCategory);
                        }}
                        className="text-accent hover:bg-accent/10 h-8 w-8 rounded-full"
                        title="इस श्रेणी में नुस्खा जोड़ें"
                      >
                        <Plus className="w-5 h-5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteCategory(category);
                        }}
                        className="text-destructive hover:bg-destructive/10 h-8 w-8 rounded-full"
                        title="पूरी श्रेणी हटाएं"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {expandedCategory === category && (
                    <div className={cn("divide-y", isNight ? "bg-zinc-900 divide-white/5" : "bg-white")}>
                      {Object.entries(diseases).map(([disease, recipes]) => {
                        const firstDisRecipe = recipes[0];
                        
                        return (
                          <div key={disease} className="pl-4">
                            <div className={cn("flex items-center transition-colors", isNight ? "hover:bg-zinc-800" : "hover:bg-muted/30")}>
                              <button 
                                onClick={() => toggleDisease(disease)}
                                className={cn("flex-1 flex items-center gap-3 p-4 font-medium text-left", isNight ? "text-zinc-300" : "text-slate-700")}
                              >
                                {expandedDisease === disease ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                {disease}
                                <span className="text-xs text-muted-foreground ml-2">{recipes.length} नुस्खे</span>
                              </button>
                              <div className="flex items-center gap-1 mr-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onQuickAdd(firstDisRecipe.mainCategory, firstDisRecipe.diseaseName);
                                  }}
                                  className="text-accent/70 hover:bg-accent/10 h-7 w-7 rounded-full"
                                  title="इस बीमारी के लिए नुस्खा जोड़ें"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteSubCategory(category, disease);
                                  }}
                                  className="text-destructive/70 hover:bg-destructive/10 h-7 w-7 rounded-full"
                                  title="पूरी बीमारी हटाएं"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </div>
                            
                            {expandedDisease === disease && (
                              <div className={cn("divide-y border-t", isNight ? "bg-black/20 divide-white/5 border-white/5" : "bg-slate-50/50")}>
                                {recipes.map((recipe) => (
                                  <div key={recipe.id} className="p-4 flex items-center justify-between group">
                                    <div className="flex-1">
                                      <h4 className={cn("font-bold flex items-center gap-2", isNight ? "text-zinc-200" : "text-primary")}>
                                        {recipe.remedyTitle?.hi || 'Untitled'}
                                        <button 
                                          onClick={() => router.push(`/?remedyId=${recipe.id}`)}
                                          className={cn("p-1 rounded transition-colors", isNight ? "text-zinc-600 hover:bg-white/5 hover:text-accent" : "text-primary/40 hover:bg-primary/10 hover:text-primary")}
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
                                        className={cn(isNight ? "text-blue-400 hover:bg-blue-900/20" : "text-blue-600 hover:bg-blue-50")}
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
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground italic">अभी कोई डेटा नहीं है।</div>
        )}
      </CardContent>
    </Card>
  );
};
