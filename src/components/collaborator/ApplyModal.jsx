"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {Envelope} from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import {toast} from "react-toastify";
import {applyToOpportunity, checkApplicationStatus} from "@/lib/actions/application";

export function ApplyModal({opportunityId, applicantEmail}) {
  const [isOpen, setIsOpen] = useState(false);
  const [portfolioLink, setPortfolioLink] = useState("");
  const [motivationMessage, setMotivationMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!opportunityId || !applicantEmail) {
      setChecking(false);
      return;
    }       

    const checkStatus = async () => {
      const result = await checkApplicationStatus(opportunityId, applicantEmail);
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

      <Modal.Backdrop className="bg-black/50 p-4">
        <Modal.Container placement="center">
          <Modal.Dialog className="w-full max-w-lg overflow-hidden rounded-2xl">
            <Modal.CloseTrigger />

            <Modal.Header className="border-b border-default-200 px-6 py-4">
              <Modal.Heading className="text-xl font-semibold">
                Apply to Opportunity
              </Modal.Heading>

              <p className="text-sm leading-5 text-muted">
                Fill out the form below to submit your application.
              </p>
            </Modal.Header>

            <form onSubmit={handleSubmit}>
              <Modal.Body className="max-h-[70vh] overflow-y-auto px-6 py-3">
                <Surface variant="default" className="rounded-xl">
                  <div className="flex flex-col gap-5">
                    <TextField
                      className="w-full"
                      name="opportunityId"
                      type="text"
                      variant="secondary"
                      isReadOnly
                      value={opportunityId ?? ""}
                    >
                      <Label>Opportunity ID</Label>
                      <Input />
                    </TextField>

                    <TextField
                      className="w-full"
                      name="applicantEmail"
                      type="email"
                      variant="secondary"
                      isReadOnly
                      value={applicantEmail ?? ""}
                    >
                      <Label>Applicant Email</Label>
                      <Input />
                    </TextField>

                    <TextField
                      className="w-full"
                      name="portfolioLink"
                      type="url"
                      variant="secondary"
                      isRequired
                      value={portfolioLink}
                      onChange={setPortfolioLink}
                    >
                      <Label>Portfolio Link</Label>
                      <Input placeholder="https://your-portfolio.com" />
                    </TextField>

                    <TextField
                      className="w-full"
                      name="motivationMessage"
                      variant="secondary"
                      isRequired
                      value={motivationMessage}
                      onChange={setMotivationMessage}
                    >
                      <Label>Motivation Message</Label>
                      <TextArea
                        className="min-h-20 resize-none"
                        placeholder="Why are you a good fit for this role?"
                      />
                    </TextField>
                  </div>
                </Surface>
              </Modal.Body>

              <Modal.Footer className="border-t border-default-200 px-6 py-2">
                <Button
                  className="w-full my-2 bg-[#131B3A] font-medium text-white hover:bg-[#0b1125]"
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