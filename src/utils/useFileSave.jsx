import { useState } from "react";
import { save } from "@tauri-apps/plugin-dialog";
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { toast } from "react-toastify";

export function useFileSave() {
  async function saveAs(data, report_name) {
    const filePath = await save({
      title: "Save Report",
      defaultPath: `${report_name}.json`,
      filters: [
        {
          name: "JSON",
          extensions: ["json"],
        },
      ],
    });

    if (!filePath) return;

    await writeTextFile(filePath, JSON.stringify(data, null, 2));

    return true;
  }

  return {
    saveAs,
  };
}
