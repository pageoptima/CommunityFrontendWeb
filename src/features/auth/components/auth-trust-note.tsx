import Image from "next/image";

export function AuthTrustNote() {
  return (
    <div className="mt-8 text-center">
      <Image
        alt=""
        aria-hidden="true"
        className="mx-auto size-7 object-contain"
        height={28}
        src="/icons/auth/shield.svg"
        width={28}
      />
      <p className="mt-2 text-sm leading-[1.48] font-medium text-black">
        Your data is protected with bank-level encryption and stored on
        sovereign, community-owned servers.
      </p>
    </div>
  );
}
