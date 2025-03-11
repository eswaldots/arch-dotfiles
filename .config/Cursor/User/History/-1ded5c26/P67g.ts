import { PublicPersonal } from "@/models/personal-models";
import { deletePersonal, getPublicPersonal } from "@/services/personal.service";
import createWindow from "@/services/window.service";
import { useEffect, useState } from "react";

export const usePersonalTable = (searchParam: string) => {
  const [personal, setPersonal] = useState<PublicPersonal[]>([]);

  const editPersonal = (id: number) => {
    createWindow(
      {
        title: "Editar Personal",
        url: `/personal/personal/${id}/`,
        center: true,
        maximized: true,
        resizable: true,
        decorations: false,
        x: 0,
        y: 0,
        width: 800,
        height: 600
      },
      "/personal/personal/id"
    );
  };

  const fetchPersonal = async () => {
    const response = await getPublicPersonal(searchParam);

    return response;
  };

  const eliminatePersonal = async (id: number) => {
    const response = await deletePersonal(id);

    if (response.success) {
      const newPersonal = await fetchPersonal();

      setPersonal(newPersonal.data);
    }
  };

  useEffect(() => {
    fetchPersonal().then((res) => {
      setPersonal(res.data);
    });
  }, [searchParam]);

  return {
    editPersonal,
    personal,
    fetchPersonal,
    deletePersonal,
    eliminatePersonal
  };
};
