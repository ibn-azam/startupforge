"use client";

import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";

export function DeleteProfileModal({ handleDelete, isDeleting, name }) {
  const itemName = name || "your account";

  return (
    <AlertDialog>
      <Button color="danger" variant="danger" className="flex-1">
        Delete my account
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete {itemName} permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{itemName}</strong> and all
                of its data, including your profile, applications, and any
                startups you manage. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                slot="close"
                variant="danger"
                isLoading={isDeleting}
                isDisabled={isDeleting}
                startContent={!isDeleting && <TrashBin size={16} />}
                onPress={handleDelete}
              >
                Delete Account
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
