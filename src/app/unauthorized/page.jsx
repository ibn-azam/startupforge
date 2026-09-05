import Link from "next/link";
import { Button } from "@heroui/react";
import { ArrowLeft, Lock } from "@gravity-ui/icons";

export default function Unauthorized() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-[#F8F7F4] px-6 py-16">
			<div className="w-full max-w-lg text-center">
				<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#131B3A] shadow-lg shadow-[#131B3A]/15">
					<Lock className="h-10 w-10 text-[#FF6B35]" />
				</div>

				<p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B35]">
					Access restricted
				</p>
				<h1 className="mt-3 font-space-grotesk text-3xl font-bold text-[#131B3A] sm:text-4xl">
					You don&apos;t have permission to view this page
				</h1>
				<p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-500">
					This area is limited to a different account role. Return home or sign
					in with an account that has access.
				</p>

				<div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
					<Link href="/">
						<Button className="flex w-full items-center justify-center gap-2 bg-[#FF6B35] px-6 py-3 font-space-grotesk font-semibold text-white transition-colors hover:bg-[#e85a2a] sm:w-auto">
							<ArrowLeft width={18} height={18} />
							Back to home
						</Button>
					</Link>
					<Link href="/login">
						<Button
							variant="bordered"
							className="w-full border-[#131B3A] px-6 py-3 font-space-grotesk font-semibold text-[#131B3A] sm:w-auto"
						>
							Sign in
						</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}
