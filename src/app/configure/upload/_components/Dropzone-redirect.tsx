import { Loader2 } from 'lucide-react';

function DropzoneRedirect() {
  return (
    <>
      <Loader2 className="animate-spin h-6 w-6 text-zinc-500" />
      <p>Redirecting, please wait...</p>
    </>
  );
}
export default DropzoneRedirect;
