import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { BACKEND_URL, req_config, templates } from "@/lib/config";
import axios from "axios";

export default function CreateReplModal({ open }: { open: boolean }) {
  const [isOpen, setIsOpen] = useState(open);
  const [title, SetTitle] = useState<string>("");
  const [privacymode, SetPrivacyMode] = useState<string>("public");
  const [template, SetTemplate] = useState<string>("");
  console.log(template);

  async function createRepl() {
    console.log(title, template, privacymode);
    if (!title || !template || !privacymode) return;
    const res = await axios.post(
      `${BACKEND_URL}/repl/create`,
      {
        title,
        template,
        privacymode,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(res);
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Create a Repl</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!open)}
            ></Button>
          </div>
        </DialogHeader>
        <Tabs defaultValue="template" className="w-full">
          <TabsContent value="template">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Title</Label>
                <Input
                  id="name"
                  placeholder="Name your Repl"
                  onChange={(e) => SetTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Select Template</Label>

                <div className="grid grid-cols-1 gap-2">
                  {templates.map((t, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`justify-start ${
                        template == t.name ? "bg-green-400" : ""
                      }`}
                      onClick={() => SetTemplate(t.name)}
                    >
                      <img
                        src={t.image}
                        alt="Python"
                        className="mr-2 h-8 w-8"
                      />
                      {t.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Privacy</Label>
                <RadioGroup defaultValue="private">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="public"
                      id="public"
                      onClick={() => SetPrivacyMode("public")}
                    />
                    <Label htmlFor="public">Public</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="private"
                      id="private"
                      onClick={() => SetPrivacyMode("private")}
                    />
                    <Label htmlFor="private">Private</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <Button onClick={() => createRepl()} className="w-full">
              Create Repl
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
