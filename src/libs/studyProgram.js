export const MAP_PROGRAM_CODE = {
  "S1-IK": "S1 - Ilmu Komputer",
  "S1_KI-IK": "S1 KI - Ilmu Komputer",
  "S1-SI": "S1 - Sistem Informasi",
  "S1_EKS-SI": "S1 Ekstensi - Sistem Informasi",
  "S2-IK": "S2 - Ilmu Komputer",
  "S2-TI": "S2 - Teknologi Informasi",
  "S3-IK": "S3 - Ilmu Komputer",
};

export function prettifyStudyProgram(csuiProgram) {
  return MAP_PROGRAM_CODE[csuiProgram] || "-";
}

const PROGRAMS = Object.keys(MAP_PROGRAM_CODE).map(code => ({
  value: code,
  label: MAP_PROGRAM_CODE[code],
}));

export default PROGRAMS;
