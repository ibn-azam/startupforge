"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Envelope } from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { toast } from "react-toastify";
import {
  applyToOpportunity,
  checkApplicationStatus,
} from "@/lib/actions/application";

export function ApplyModal({ opportunityId, applicantEmail }) {
  const [isOpen, setIsOpen] = useState(false);
  const [portfolioLink, setPortfolioLink] = useState("");
  const [motivationMessage, setMotivationMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!opportunityId || !applicantEmail) {
      Promise.resolve().then(() => setChecking(false));
      return;
    }

    const checkStatus = async () => {
      const result = await checkApplicationStatus(
        opportunityId,
        applicantEmail,
      );
      setHasApplied(!!result?.hasApplied);
      setChecking(false);
    };
    checkStatus();
  }, [opportunityId, applicantEmail]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!portfolioLink.trim() || !motivationMessage.trim()) {
      toast.error("Please complete all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await applyToOpportunity({
        opportunityId,
        applicantEmail,
        portfolioLink: portfolioLink.trim(),
        motivationMessage: motivationMessage.trim(),
      });

      if (result?.success === false) {
        throw new Error(result.error || "Unable to submit application.");
      }

      toast.success("Application submitted!");
      setPortfolioLink("");
      setMotivationMessage("");
      setHasApplied(true);
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Unable to submit application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        className="mt-8 w-full bg-[#131B3A] font-medium text-white hover:bg-[#0b1125] disabled:cursor-not-allowed disabled:opacity-60"
        onPress={() => setIsOpen(true)}
        isDisabled={hasApplied || checking}
      >
        {hasApplied ? "Applied" : "Apply Now"}
      </Button>

      <Modal.Backdrop className="bg-[#131B3A]/40 p-4 backdrop-blur-sm">
        <Modal.Container placement="center">
          <Modal.Dialog className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[#6B7280]/10 bg-white shadow-xl">
            <Modal.CloseTrigger className="text-[#6B7280] hover:text-[#131B3A]" />

            <Modal.Header className="shrink-0 border-b border-[#6B7280]/10 bg-[#FAFAFA] px-6 py-5">
              <Modal.Heading className="font-space-grotesk text-xl font-bold text-[#131B3A]">
                Apply to Opportunity
              </Modal.Heading>

              <p className="mt-1 text-sm leading-5 text-[#6B7280]">
                Fill out the form below to submit your application.
              </p>
            </Modal.Header>

            <form
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >
              <Modal.Body className="flex-1 overflow-y-auto px-6 py-5">
                {/* Applying-as summary, replaces editable-looking read-only fields */}
                <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#6B7280]/10 bg-[#FAFAFA] px-4 py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#131B3A]/5">
                    <Envelope className="h-4 w-4 text-[#131B3A]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Applying as
                    </p>
                    <p className="truncate text-sm font-medium text-[#131B3A]">
                      {applicantEmail || "Not available"}
                    </p>
                  </div>
                </div>

                <Surface variant="default" className="rounded-xl">
                  <div className="flex flex-col gap-5">
                    <TextField
                      className="w-full"
                      name="portfolioLink"
                      type="url"
                      variant="secondary"
                      isRequired
                      value={portfolioLink}
                      onChange={setPortfolioLink}
                    >
                      <Label className="text-sm font-medium text-[#131B3A]">
                        Portfolio Link
                      </Label>
                      <Input
                        placeholder="https://your-portfolio.com"
                        className="focus:border-[#FF6B35] focus:ring-[#FF6B35]/20"
                      />
                    </TextField>

                    <TextField
                      className="w-full"
                      name="motivationMessage"
                      variant="secondary"
                      isRequired
                      value={motivationMessage}
                      onChange={setMotivationMessage}
                    >
                      <Label className="text-sm font-medium text-[#131B3A]">
                        Motivation Message
                      </Label>
                      <TextArea
                        className="min-h-32 resize-none focus:border-[#FF6B35] focus:ring-[#FF6B35]/20"
                        placeholder="Why are you a good fit for this role?"
                      />
                    </TextField>
                  </div>
                </Surface>
              </Modal.Body>

              <Modal.Footer className="flex shrink-0 gap-3 border-t border-[#6B7280]/10 bg-[#FAFAFA] px-6 py-4">
                <Button
                  type="button"
                  onPress={() => setIsOpen(false)}
                  isDisabled={submitting}
                  className="flex-1 border border-[#6B7280]/20 bg-white font-medium text-[#131B3A]"
                >
                  Cancel
                </Button>

                <Button
                  className="flex-1 bg-[#FF6B35] font-medium text-white hover:bg-[#e55a2b] disabled:cursor-not-allowed disabled:opacity-60"
                  type="submit"
                  isDisabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
