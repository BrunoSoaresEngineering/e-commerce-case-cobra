'use server';

import { db } from '@/db/client';
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from '@prisma/client';

type SaveConfigurationInDbArgs = {
  configId: string,
  configuration: {
    caseColor: CaseColor,
    phoneModel: PhoneModel,
    caseMaterial: CaseMaterial,
    caseFinish: CaseFinish,
  }
}

async function saveConfigurationInDb({ configId, configuration }: SaveConfigurationInDbArgs) {
  await db.configuration.update({
    where: { id: configId },
    data: { ...configuration },
  });
}

export {
  type SaveConfigurationInDbArgs,
  saveConfigurationInDb,
};
