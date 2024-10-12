import { notFound } from 'next/navigation';
import { db } from '@/db/client';
import Providers from '@/components/Providers';
import DesignConfigurator from './_components/Design-configurator';
import ConfiguratorContext from './_components/Configurator-context';

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
    <ConfiguratorContext
      imageDimensions={{ height: configuration.height, width: configuration.width }}
      imageUrl={configuration.imageUrl}
    >
      <Providers>
        <DesignConfigurator configId={configuration.id} />
      </Providers>
    </ConfiguratorContext>
  );
}
export default DesignPage;
