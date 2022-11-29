import type { User } from '@prisma/client';
import { prisma } from './prisma.server'
import type { RegisterFormData } from '../types/RegisterForm';

export const findUserByPhoneAndVpo =  async (phone: string, vpoLastFour: string) => {
  const user = await prisma.user.findFirst({
    where: {
      phone,
      vpoLastFour
    }
  });

  return user;
}

export const findUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id }})
  return user;
}

export const createUser = async (formData: RegisterFormData) => {
  const newUser = await prisma.user.create({
    data: {
      fullName: formData.fullName,
      birthday: formData.birthday,
      vpoLastFour: formData.vpoLastFour,
      phone: formData.phone,
      passportRegistration: {
        city: formData.passportCity,
        street: formData.passportStreet,
        corpus: formData.passportCourpus,
        house: formData.passportHouse,
        apt: formData.passportApt,
      },
      vpoRegistration: {
        city: formData.vpoCity,
        street: formData.vpoStreet,
        corpus: formData.vpoCourpus,
        house: formData.vpoHouse,
        apt: formData.vpoApt,
      },
      familyStatus: {
        personsCount: formData.personsCount,
        spousesFullName: formData.spousesFullName,
      }
    }
  })

  return newUser;
}