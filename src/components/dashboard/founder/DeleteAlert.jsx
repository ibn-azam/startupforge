"use client";

import { TrashBin } from "@gravity-ui/icons";
import {AlertDialog, Button} from "@heroui/react";

export function DeleteAlert({handleDelete,isDeleting,startup}) {
  return (
    <AlertDialog>
       <Button
                color="danger"
                variant="danger"
                className="flex-1"
               
              >
                Delete
              </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete {startup.name} permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{startup.name}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger"
               isLoading={isDeleting}
                isDisabled={isDeleting}
                startContent={!isDeleting && <TrashBin size={16} />}
                onPress={handleDelete}>
                Delete Startup
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}