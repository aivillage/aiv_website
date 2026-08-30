import { validateContentIdentities } from "./content-identities";

const { checked, failures } = validateContentIdentities(process.cwd());

if (failures.length > 0) {
  console.error("Content identity verification failed:");
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Content identity verification passed for ${checked} records.`);
}
