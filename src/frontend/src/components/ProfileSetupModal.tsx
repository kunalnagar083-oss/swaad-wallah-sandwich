import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSaveCustomerProfile } from "../hooks/useQueries";

interface Props {
  open: boolean;
  onComplete: () => void;
}

export default function ProfileSetupModal({ open, onComplete }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const saveProfile = useSaveCustomerProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    try {
      await saveProfile.mutateAsync({ name: name.trim(), phone: phone.trim() });
      toast.success("Welcome to Swaad Wallah Sandwich!");
      onComplete();
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-sm" data-ocid="profile.dialog">
        <DialogHeader>
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <User className="w-7 h-7 text-primary" />
          </div>
          <DialogTitle className="font-display text-2xl font-800 text-center">
            Set Up Your Profile
          </DialogTitle>
          <p className="text-muted-foreground text-sm text-center">
            Just a few details so we can process your orders correctly.
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="profile-name">Your Name</Label>
            <Input
              id="profile-name"
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1"
              data-ocid="profile.input"
            />
          </div>
          <div>
            <Label htmlFor="profile-phone">Phone Number</Label>
            <Input
              id="profile-phone"
              type="tel"
              placeholder="e.g. 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1"
              data-ocid="profile.input"
            />
          </div>
          <Button
            type="submit"
            disabled={saveProfile.isPending || !name.trim() || !phone.trim()}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-bold"
            data-ocid="profile.submit_button"
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
              </>
            ) : (
              "Start Ordering"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
