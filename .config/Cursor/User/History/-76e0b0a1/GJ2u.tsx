import { createContext, useContext, useState } from "react";

export type RecordType = "admonition" | "course";

export interface Record {
  id: string;
  record_name: string;
  record_type: RecordType;
}

export interface RecordsContextType {
  records: Record[];
  addRecord: (record: Record) => void;
  removeRecord: (record: Record) => void;
}

const RecordsContext = createContext<RecordsContextType | undefined>(undefined);

function RecordsProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<Record[]>(
    JSON.parse(localStorage.getItem("repein_records") || "[]")
  );

  const addRecord = (record: Record) => {
    setRecords((prev) => [...prev, record]);
  };

  const removeRecord = (record: Record) => {
    setRecords((prev) => prev.filter((r) => r.id !== record.id));
  };

  return (
    <RecordsContext.Provider value={{ records, addRecord, removeRecord }}>
      {children}
    </RecordsContext.Provider>
  );
}

const useRecords = () => {
  const context = useContext(RecordsContext);

  if (context === undefined) {
    throw new Error("useRecords must be used within a RecordsProvider");
  }

  return context;
};

export { RecordsProvider, useRecords };
