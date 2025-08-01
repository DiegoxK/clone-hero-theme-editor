import { ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <aside className="flex w-94 flex-col border-r">
      <div className="border-b p-4">
        <div className="flex gap-4">
          <h2>
            Default theme <ChevronDown size={16} className="inline" />
          </h2>
        </div>
      </div>

      <Tabs defaultValue="guitar" className="overflow-hidden p-3">
        <TabsList className="w-full">
          <TabsTrigger value="guitar">Guitar</TabsTrigger>
          <TabsTrigger value="drums">Drums</TabsTrigger>
          <TabsTrigger value="others">Others</TabsTrigger>
        </TabsList>

        <Separator className="bg-border my-2" />

        <TabsContent
          value="guitar"
          className="overflow-x-hidden overflow-y-scroll pr-2"
        >
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>Notes</AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center gap-3">
                  <div className="size-9 flex-shrink-0 rounded-md bg-green-200" />
                  <Input />
                  <Button size="icon">
                    <ChevronDown />
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-9 flex-shrink-0 rounded-md bg-red-200" />
                  <Input />
                  <Button size="icon">
                    <ChevronDown />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Glow</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that match the other
                aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Fires</AccordionTrigger>
              <AccordionContent>
                Yes. By making the TabsContent a flex item that grows to fill
                all available space, the overflow property now works correctly
                on it. The long content below will now be scrollable while the
                triggers above remain fixed. Yes. By making the TabsContent a
                flex item that grows to fill all available space, the overflow
                property now works correctly on it. The long content below will
                now be scrollable while the triggers above remain fixed. Yes. By
                making the TabsContent a flex item that grows to fill all
                available space, the overflow property now works correctly on
                it. The long content below will now be scrollable while the
                triggers above remain fixed. Yes. By making the TabsContent a
                flex item that grows to fill all available space, the overflow
                property now works correctly on it. The long content below will
                now be scrollable while the triggers above remain fixed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Other</AccordionTrigger>
              <AccordionContent>
                More Content to cause overflow
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="drums" className="p-4">
          Change your password here.
        </TabsContent>
        <TabsContent value="others" className="p-4">
          Other settings go here.
        </TabsContent>
      </Tabs>
    </aside>
  );
}
