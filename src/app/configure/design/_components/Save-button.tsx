'use client';

import { RefObject } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import { ArrowRight } from 'lucide-react';
import image from '../_lib/image';
import { ConfigurationImageContext, useConfigurationImageContext, useCurrentOptionsContext } from './Configurator-context';
import { saveConfigurationInDb, SaveConfigurationInDbArgs } from '../../../actions/configuration';

type Refs = {
  phoneCaseRef: RefObject<HTMLDivElement>,
  containerRef: RefObject<HTMLDivElement>,
}

type SaveButtonProps = {
  refs: Refs,
  configId: string,
}

type SaveConfigurationMutationArgs = Pick<SaveConfigurationInDbArgs, 'configuration'> & {
  configurationImage: ConfigurationImageContext
  configId: string,
  refs: Refs,
  startUpload: (files: File[], input: { configId?: string | undefined }) => void,
}

async function saveConfigurationImage({
  configId,
  configurationImage,
  refs,
  startUpload,
}: SaveConfigurationMutationArgs) {
  const phoneCaseBoundingRect = refs.phoneCaseRef.current!.getBoundingClientRect();

  const containerBoundingRect = refs.containerRef.current!.getBoundingClientRect();

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

  await startUpload([file], { configId });
}

async function saveConfigurationMutation(args: SaveConfigurationMutationArgs) {
  await Promise.all([
    saveConfigurationImage(args),
    saveConfigurationInDb({ configId: args.configId, configuration: args.configuration }),
  ]);
}

function SaveButton({ refs, configId }: SaveButtonProps) {
  const { startUpload } = useUploadThing('imageUploader');
  const { toast } = useToast();
  const router = useRouter();

  const configurationImage = useConfigurationImageContext();
  const { currentOptions } = useCurrentOptionsContext();

  const configuration = {
    caseColor: currentOptions.color.value,
    phoneModel: currentOptions.model.value,
    caseMaterial: currentOptions.material.value,
    caseFinish: currentOptions.finish.value,
  };

  const saveConfigurationMutationArgs = {
    configId,
    configuration,
    configurationImage,
    refs,
    startUpload,
  };

  const { mutate: saveConfiguration } = useMutation({
    mutationKey: ['save-config'],
    mutationFn: saveConfigurationMutation,
    onError: () => {
      toast({
        title: 'An error has occurred',
        description: 'There was an internal application error. Please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => router.push(`/configure/preview?id=${configId}`),
  });

  return (
    <Button
      size="sm"
      className="w-full"
      onClick={() => saveConfiguration(saveConfigurationMutationArgs)}
    >
      Continue
      <ArrowRight className="h-4 w-4 ml-1.5" />
    </Button>
  );
}
export default SaveButton;
