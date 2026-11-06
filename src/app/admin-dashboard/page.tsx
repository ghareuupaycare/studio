'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LayoutDashboard, LogOut, PlusCircle, ChevronLeft, ClipboardList, Moon, Sun, MessageSquare, Send, X, Trash2, Sparkles, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { AdminRemedyList } from '@/components/admin/admin-remedy-list';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { postAdminReply } from '@/lib/chat-sync';

type ViewState = 'overview' | 'manage' | 'add-recipe' | 'questions';
type Theme = 'cream' | 'night';

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const db = useFirestore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [view, setView] = useState<ViewState>('overview');
  const [theme, setTheme] = useState<Theme>('cream');
  const [questions, setQuestions] = useState<any[]>([]);
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  useEffect(() => {
    const isAuth = typeof window !== 'undefined' ? localStorage.getItem('gharelu_admin_auth') : null;
    if (isAuth !== 'true') router.push('/admin-login');
    else setIsLoaded(true);
  }, [router]);

  useEffect(() => {
    if (!db) return;
    const unsubQuestions = onSnapshot(query(collection(db, 'questions')), (snapshot) => {
      setQuestions(snapshot.docs.map(doc => {
        const data = doc.data();
        return { 
          id: doc.id, 
          ...data,
          _ts: data.timestamp?.toMillis() || Date.now()
        };
      }));
    });
    return () => { unsubQuestions(); };
  }, [db]);

  const isNight = theme === 'night';

  const groupedQuestions = useMemo(() => {
    const groups: Record<string, any> = {};
    questions.forEach(q => {
      const key = `${q.userId}_${q.remedyId}`;
      if (!groups[key]) {
        groups[key] = { userId: q.userId, remedyId: q.remedyId, remedyName: q.remedyName, messages: [] };
      }
      groups[key].messages.push(q);
    });
    return Object.values(groups).map((g: any) => ({
      ...g,
      messages: g.messages.sort((a: any, b: any) => a._ts - b._ts)
    })).sort((a: any, b: any) => {
      const lastA = a.messages[a.messages.length - 1]?._ts || 0;
      const lastB = b.messages[b.messages.length - 1]?._ts || 0;
      return lastB - lastA;
    });
  }, [questions]);

  const handleReplyThread = async (threadKey: string, thread: any) => {
    if (!db || !replyText[threadKey]?.trim()) return;
    const latestDoc = thread.messages[thread.messages.length - 1];
    if (!latestDoc) return;

    try {
      await postAdminReply(db, latestDoc.id, replyText[threadKey]);
      setReplyText(prev => ({ ...prev, [threadKey]: '' }));
      toast({ title: "जवाब भेज दिया गया!" });
    } catch (e) { toast({ variant: "destructive", title: "त्रुटि" }); }
  };

  const handleQuestionDelete = async (qId: string) => {
    if (!db || !confirm("क्या आप इस संदेश को स्थायी रूप से हटाना चाहते हैं? यह यूज़र के मोबाइल से भी हट जाएगा।")) return;
    try { 
      await deleteDoc(doc(db, 'questions', qId)); 
      toast({ title: "संदेश स्थायी रूप से हटा दिया गया" });
    } catch (e) { 
      toast({ variant: "destructive", title: "हटाने में त्रुटि आई" }); 
    }
  };

  const formatTime = (ts: any) => {
    const date = ts instanceof Date ? ts : (typeof ts === 'number' ? new Date(ts) : new Date());
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (ts: any) => {
    const date = ts instanceof Date ? ts : (typeof ts === 'number' ? new Date(ts) : new Date());
    return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
  };

  if (!isLoaded) return null;

  return (
    <div className={cn("min-h-screen flex flex-col transition-colors duration-500", isNight ? "bg-zinc-950 text-white" : "bg-[#FDFBF7] text-foreground")}>
      <header className={cn("h-14 flex items-center justify-between px-6 sticky top-0 z-50 shadow-md", isNight ? "bg-zinc-900" : "bg-primary text-white")}>
        <div className="flex items-center gap-3"><LayoutDashboard /><h1 className="font-headline font-black text-lg">एडमिन कंट्रोल</h1></div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setTheme(prev => prev === 'cream' ? 'night' : 'cream')} className="text-white">
            {isNight ? <Sun /> : <Moon />}
          </Button>
          <Button variant="ghost" onClick={() => { localStorage.removeItem('gharelu_admin_auth'); router.push('/admin-login'); }}><LogOut className="mr-2" /> लॉगआउट</Button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        {view === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className={cn("p-8 text-center space-y-4 cursor-pointer rounded-[2.5rem] border-2 transition-all hover:scale-105 shadow-xl", isNight ? "bg-zinc-900 border-white/10" : "bg-white border-primary/10 shadow-lg")} onClick={() => setView('manage')}>
              <ClipboardList className="mx-auto w-10 h-10 text-primary" />
              <h3 className="font-bold">नुस्खे प्रबंधित करें</h3>
            </Card>
            <Card className={cn("p-8 text-center space-y-4 cursor-pointer rounded-[2.5rem] border-2 transition-all hover:scale-105 shadow-xl", isNight ? "bg-zinc-900 border-white/10" : "bg-white border-primary/10 shadow-lg")} onClick={() => router.push('/')}>
              <PlusCircle className="mx-auto w-10 h-10 text-emerald-600" />
              <h3 className="font-bold">नया नुस्खा जोड़ें</h3>
            </Card>
            <Card className={cn("p-8 text-center space-y-4 cursor-pointer rounded-[2.5rem] border-2 transition-all hover:scale-105 shadow-xl", isNight ? "bg-zinc-900 border-accent/20" : "bg-white border-accent/20 shadow-lg")} onClick={() => setView('questions')}>
              <MessageSquare className="mx-auto w-10 h-10 text-accent" />
              <h3 className="font-bold">सवालों के जवाब दें</h3>
              {questions.filter(q => !q.hasAnswer).length > 0 && <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] animate-pulse">New</span>}
            </Card>
          </div>
        )}

        {view === 'questions' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <Button variant="ghost" onClick={() => setView('overview')} className="mb-4"><ChevronLeft className="mr-2" /> पीछे</Button>
            <h2 className="text-2xl font-black font-headline">चैट थ्रेड्स</h2>
            <div className="grid gap-6">
              {groupedQuestions.map((group, idx) => {
                const threadKey = `${group.userId}_${group.remedyId}`;
                return (
                  <Card key={idx} className={cn("p-6 rounded-[2.5rem] border-2 shadow-sm", isNight ? "bg-zinc-900 border-white/5" : "bg-white border-accent/20")}>
                    <div className="mb-6 border-b pb-4">
                      <button onClick={() => router.push(`/?remedyId=${group.remedyId}`)} className="text-left group/link flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-accent" />
                        <h3 className="text-xl font-bold group-hover/link:text-accent transition-colors">{group.remedyName?.hi}</h3>
                        <ExternalLink className="w-4 h-4 opacity-40" />
                      </button>
                    </div>
                    <div className="space-y-6 max-h-[400px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                      {group.messages.map((item: any) => (
                        <div key={item.id} className="space-y-1 group/msg flex flex-col">
                          {/* Sync Delete Button */}
                          <div className="flex justify-end items-center px-1 mb-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-destructive opacity-0 group-hover/msg:opacity-100 transition-opacity" 
                              onClick={() => handleQuestionDelete(item.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>

                          {/* User Message Bubble with Timestamp Below */}
                          <div className="flex flex-col items-end w-full">
                            <div className={cn("px-4 py-2.5 rounded-2xl rounded-tr-none max-w-[85%] border shadow-sm", isNight ? "bg-zinc-800 border-white/5" : "bg-muted/30 border-primary/5")}>
                              <p className="font-bold text-sm leading-relaxed">{item.question}</p>
                            </div>
                            <span className="text-[9px] font-bold opacity-30 mt-1 mr-1">
                              {formatDate(item._ts)}, {formatTime(item._ts)}
                            </span>
                          </div>

                          {/* Admin Answer Bubble with Timestamp Below */}
                          {item.answer && (
                            <div className="mt-4 self-start max-w-[85%] flex flex-col items-start">
                              <div className="px-4 py-2.5 rounded-2xl rounded-tl-none border-2 border-accent/40 bg-accent/5 shadow-md">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="bg-accent p-0.5 rounded-full"><Sparkles className="w-2.5 h-2.5 text-white" /></div>
                                  <span className="text-[9px] font-black text-accent uppercase tracking-[0.2em]">वैद्य जी:</span>
                                </div>
                                <p className="text-sm font-medium leading-relaxed">{item.answer}</p>
                              </div>
                              {item.answeredAt && (
                                <span className="text-[9px] font-bold opacity-30 mt-1 ml-1">
                                  {formatDate(item.answeredAt?.toMillis ? item.answeredAt.toMillis() : item.answeredAt)}, 
                                  {formatTime(item.answeredAt?.toMillis ? item.answeredAt.toMillis() : item.answeredAt)}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-accent/10 flex gap-2">
                      <Textarea placeholder="जवाब लिखें..." value={replyText[threadKey] || ''} onChange={(e) => setReplyText(prev => ({ ...prev, [threadKey]: e.target.value }))} className={cn("rounded-2xl border-2 min-h-[60px] text-sm", isNight ? "bg-zinc-800 border-white/5" : "bg-white border-primary/5")} />
                      <Button className="bg-accent hover:bg-accent/90 px-4 rounded-2xl text-white" onClick={() => handleReplyThread(threadKey, group)} disabled={!replyText[threadKey]?.trim()}><Send className="w-4 h-4" /></Button>
                    </div>
                  </Card>
                );
              })}
              {groupedQuestions.length === 0 && <div className="p-20 text-center opacity-30 italic">कोई चैट नहीं है</div>}
            </div>
          </div>
        )}

        {view === 'manage' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <Button variant="ghost" onClick={() => setView('overview')} className="mb-4"><ChevronLeft className="mr-2" /> पीछे</Button>
            <AdminRemedyList groupedRecipes={{}} onEdit={()=>{}} onDelete={()=>{}} onDeleteCategory={()=>{}} onDeleteSubCategory={()=>{}} onQuickAdd={()=>{}} isNight={isNight} />
          </div>
        )}
      </main>
    </div>
  );
}
