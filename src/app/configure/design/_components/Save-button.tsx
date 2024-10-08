import { RefObject } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import { ArrowRight } from 'lucide-react';
import image from '../_lib/image';

type SaveButtonProps = {
  phoneCaseRef: RefObject<HTMLDivElement>,
  containerRef: RefObject<HTMLDivElement>,
  configurationImage: {
    position: {left: number, top: number},
    dimensions: {width: number, height: number},
    src: string,
    configId: string,
  }
}

function SaveButton({ phoneCaseRef, containerRef, configurationImage }: SaveButtonProps) {
  const { startUpload } = useUploadThing('imageUploader');
  const { toast } = useToast();

  async function save() {
    try {
      const phoneCaseBoundingRect = phoneCaseRef.current!.getBoundingClientRect();

      const containerBoundingRect = containerRef.current!.getBoundingClientRect();

      const imageCoordinates = image.getCoordinatesInConfigurator(
        phoneCaseBoundingRect,
        containerBoundingRect,
        configurationImage.position,
      );

      const userImage = {
        imageElement: await image.loadInImgElement(configurationImage.src),
        coordinates: imageCoordinates,
        dimensions: configurationImage.dimensions,
      };

      const canvas = image.drawInNewCanvas(phoneCaseBoundingRect, userImage);

      const file = await image.canvasToFile(canvas, 'filename.png');

      await startUpload([file], { configId: configurationImage.configId });
    } catch {
      toast({
        title: 'Something went wrong',
        description: 'There was a problem saving your config, please try again',
        variant: 'destructive',
      });
    }
  }

  return (
    <Button
      size="sm"
      className="w-full"
      onClick={() => save()}
    >
      Continue
      <ArrowRight className="h-4 w-4 ml-1.5" />
    </Button>
  );
}
export default SaveButton;
