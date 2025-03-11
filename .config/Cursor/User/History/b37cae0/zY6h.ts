export type RecordType = "expediente" | "oficio";

export interface BoundingMemberModel {
  id: string;
  record_name: string;
  record_type: RecordType;
  record_organism: string;
  record_dependency: string;
  record_state: string;
  record_document: string;
  record_date: string;
  record_images: string;
}