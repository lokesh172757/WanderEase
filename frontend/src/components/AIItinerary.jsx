import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { aiService } from '@/services/aiService';
import { Loader2, Sparkles, Map, List } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const AIItinerary = ({ destinationName, duration, travelers, weatherForecast }) => {
    const [itinerary, setItinerary] = useState(null);
    const [backpack, setBackpack] = useState(null);
    const [loadingItinerary, setLoadingItinerary] = useState(false);
    const [loadingBackpack, setLoadingBackpack] = useState(false);

    const handleGenerateItinerary = async () => {
        setLoadingItinerary(true);
        try {
            const data = await aiService.suggestItinerary(destinationName, duration, weatherForecast);
            setItinerary(data.suggestions);
        } catch (error) {
            console.error("AI Error", error);
        } finally {
            setLoadingItinerary(false);
        }
    };

    const handleGenerateBackpack = async () => {
        setLoadingBackpack(true);
        try {
            const data = await aiService.generateBackpackList(destinationName, duration, travelers, weatherForecast);
            setBackpack(data.categories);
        } catch (error) {
            console.error("AI Error", error);
        } finally {
            setLoadingBackpack(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-purple-500" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    AI Travel Assistant
                </h2>
            </div>

            <Tabs defaultValue="itinerary" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="itinerary">Daily Itinerary</TabsTrigger>
                    <TabsTrigger value="backpack">Smart Packing List</TabsTrigger>
                </TabsList>

                {/* Itinerary Tab */}
                <TabsContent value="itinerary" className="space-y-4">
                    <Card className="border-purple-200 dark:border-purple-900 shadow-lg">
                        <CardHeader>
                            <CardTitle>AI-Curated Daily Plan</CardTitle>
                            <CardDescription>
                                Get a personalized day-by-day plan based on the weather forecast.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {!itinerary ? (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground mb-4">Unlock your perfect trip plan powered by Gemini AI.</p>
                                    <Button
                                        onClick={handleGenerateItinerary}
                                        disabled={loadingItinerary}
                                        className="bg-purple-600 hover:bg-purple-700 text-white"
                                    >
                                        {loadingItinerary ? (
                                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                                        ) : (
                                            <><Sparkles className="mr-2 h-4 w-4" /> Generate Itinerary</>
                                        )}
                                    </Button>
                                </div>
                            ) : (
                                <ScrollArea className="h-[400px] pr-4">
                                    <div className="space-y-6">
                                        {itinerary.map((day) => (
                                            <div key={day.day} className="relative pl-6 border-l-2 border-purple-200 dark:border-purple-800 last:border-0 pb-6">
                                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-purple-600 ring-4 ring-white dark:ring-background" />
                                                <h3 className="font-semibold text-lg mb-2 text-purple-700 dark:text-purple-400">Day {day.day}</h3>
                                                <ul className="space-y-2">
                                                    {day.activities.map((activity, i) => (
                                                        <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md">
                                                            <span className="text-purple-500">•</span>
                                                            {activity}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Backpack Tab */}
                <TabsContent value="backpack" className="space-y-4">
                    <Card className="border-blue-200 dark:border-blue-900 shadow-lg">
                        <CardHeader>
                            <CardTitle>Smart Packing List</CardTitle>
                            <CardDescription>
                                Essential items customized for your {duration}-day trip.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {!backpack ? (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground mb-4">Don't forget a thing! Generate your checklist.</p>
                                    <Button
                                        onClick={handleGenerateBackpack}
                                        disabled={loadingBackpack}
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        {loadingBackpack ? (
                                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Curating List...</>
                                        ) : (
                                            <><List className="mr-2 h-4 w-4" /> Generate Packing List</>
                                        )}
                                    </Button>
                                </div>
                            ) : (
                                <ScrollArea className="h-[400px] pr-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {backpack.map((cat, idx) => (
                                            <div key={idx} className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50">
                                                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center justify-between">
                                                    {cat.category}
                                                    <Badge variant="outline" className="text-xs">{cat.items.length}</Badge>
                                                </h4>
                                                <ul className="space-y-1">
                                                    {cat.items.map((item, i) => (
                                                        <li key={i} className="text-sm flex items-start gap-2">
                                                            <input type="checkbox" className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                            <span className="text-gray-600 dark:text-gray-300">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AIItinerary;
