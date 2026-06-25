"use client";

import { useRef, useState } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FiUser } from "react-icons/fi";

export function EditProfileModal({ isOpen, onOpenChange, user }) {
  const nameRef = useRef(null);
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const name = nameRef.current?.value || "";
      const image = imageRef.current?.value || "";

      await authClient.updateUser({ name, image });
      window.location.reload();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-md bg-slate-950 border border-slate-900 shadow-2xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-emerald-500/10 text-emerald-400">
                <FiUser className="size-5" />
              </Modal.Icon>
              <Modal.Heading className="text-white">Edit Profile</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default" className="bg-slate-900/40 border-slate-800">
                <form className="flex flex-col gap-4 p-4">
                  <TextField
                    className="w-full"
                    name="name"
                    variant="secondary"
                    defaultValue={user?.name || ""}
                  >
                    <Label className="text-slate-300">Name</Label>
                    <Input
                      ref={nameRef}
                      placeholder="Enter your name"
                      className="bg-slate-950 border-slate-800"
                    />
                  </TextField>
                  <TextField
                    className="w-full"
                    name="image"
                    variant="secondary"
                    defaultValue={user?.image || ""}
                  >
                    <Label className="text-slate-300">Image URL</Label>
                    <Input
                      ref={imageRef}
                      placeholder="Enter image URL"
                      className="bg-slate-950 border-slate-800"
                    />
                  </TextField>
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" variant="secondary" className="text-slate-300">
                Cancel
              </Button>
              <Button
                onPress={handleUpdate}
                isLoading={loading}
                className="bg-emerald-500 text-slate-950 hover:bg-emerald-400"
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
       </Modal.Backdrop>
    </Modal>
  );
}