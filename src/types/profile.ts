
export interface BaseMedicalCondition {
  id: string;
  type: string;
  value: string;
}

export interface MedicalAllergy extends BaseMedicalCondition {
  severity: string;
  dosage?: never;
}

export interface Medication extends BaseMedicalCondition {
  dosage: string;
  severity?: never;
}

export type MedicalCondition = MedicalAllergy | Medication;
