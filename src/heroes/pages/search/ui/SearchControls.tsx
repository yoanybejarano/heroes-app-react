import {
    Search,
    Plus,
    Filter,
    SortAsc,
    Grid,
} from "lucide-react"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Slider} from "@/components/ui/slider"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {useState} from "react";
import * as React from "react";
import {useSearchParams} from "react-router";

const SearchControls = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [nameValue, setNameValue] = useState(searchParams.get('name') ?? '');

    const activeAccordion = searchParams.get("active-accordion");
    const accordionValue = activeAccordion ? [activeAccordion] : [];
    const selectedStrength = Number(searchParams.get("strength") ?? '0');

    const setQueryParams = (name: string, value: string) => {
        setSearchParams(prev => {
            prev.set(name, value);
            return prev;
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setQueryParams('name', nameValue);
        }
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                    <Input
                        placeholder="Search heroes, villains, powers, teams..."
                        className="pl-12 h-12 text-lg bg-white"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                    <Button variant={
                                activeAccordion === 'advance-filters' ? 'default' : 'outline'
                            } className="h-12"
                            onClick={() => {
                                setSearchParams(prev => {
                                    const params = new URLSearchParams(prev);
                                    if (params.get('active-accordion') === 'advance-filters') {
                                        params.delete('active-accordion');
                                    } else {
                                        params.set('active-accordion', 'advance-filters');
                                    }
                                    return params;
                                });
                            }}>
                        <Filter className="h-4 w-4 mr-2"/>
                        Filters
                    </Button>

                    <Button variant="outline" className="h-12">
                        <SortAsc className="h-4 w-4 mr-2"/>
                        Sort by Name
                    </Button>

                    <Button variant="outline" className="h-12">
                        <Grid className="h-4 w-4"/>
                    </Button>

                    <Button className="h-12">
                        <Plus className="h-4 w-4 mr-2"/>
                        Add Character
                    </Button>
                </div>
            </div>

            {/* Advanced Filters */}
            <Accordion
                value={accordionValue}
                onValueChange={(value: string[]) => {
                    const activeValue = value[0];
                    setSearchParams(prev => {
                        const params = new URLSearchParams(prev);
                        if (activeValue) {
                            params.set("active-accordion", activeValue);
                        } else {
                            params.delete("active-accordion");
                        }
                        return params;
                    });
                }}
            >
                <AccordionItem value="advance-filters">
                    <AccordionTrigger className="hidden"></AccordionTrigger>
                    <AccordionContent>
                        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border" data-testid="accordion">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                                <Button variant="ghost">Clear All</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Team</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All teams
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All categories
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Universe</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All universes
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Status</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All statuses
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-sm font-medium">Minimum Strength: {selectedStrength}/10</label>
                                <Slider
                                    value={[selectedStrength]}
                                    min={0}
                                    max={10}
                                    step={1}
                                    onValueChange={val => setQueryParams('strength', val.toString())}
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    );
};

export default SearchControls;