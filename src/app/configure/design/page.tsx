import { notFound } from 'next/navigation';
import { db } from '@/db/client';
import DesignConfigurator from './_components/Design-configurator';

type DesignPageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

async function DesignPage({ searchParams }: DesignPageProps) {
  const { id } = searchParams;

  if (!id || typeof id !== 'string') {
    return notFound();
  }

  let configuration;

  try {
    configuration = await db.configuration.findUnique({
      where: { id },
    });
  } catch {
    return notFound();
  }

  if (!configuration) {
    return notFound();
  }

  return (
    <DesignConfigurator
      configId={configuration.id}
      imageUrl={configuration.imageUrl}
      imageDimensions={{ height: configuration.height, width: configuration.width }}
    />
  );
}
export default DesignPage;
