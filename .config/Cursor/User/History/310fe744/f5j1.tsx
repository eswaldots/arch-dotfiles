import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import SearchInput from '@/components/inputs/search-input';
import { getCustomTable } from '@/services/archive.service';

interface SearchResult {
  personal_ci: string;
  personal_name: string;
}

export const Route = createFileRoute('/_app/analysis/_layout/management/query/')({
  component: RouteComponent,
  loaderDeps: ({ search: { q } }) => ({ q }),
  loader: async ({ deps: { q } }) => {
    const res = await getCustomTable('personal', q);
    return res;
  }
});

function RouteComponent() {

  return (
    <main className="px-5 py-3">
      <h1 className="text-2xl font-bold mb-6">Búsqueda Inteligente</h1>
      
      <div className="w-full mb-6">
        <SearchInput label="Buscar por nombre o CI" />
      </div>

      <div className="p-4 border rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Búsqueda por Rostro</h2>
        <div className="flex gap-6 items-start">
          <div className="flex flex-col gap-3">
            <div className="w-48 h-48 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
            </div>
            <input
              type="file"
              accept="image/*"
              className="text-sm"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Buscar por rostro
            </button>
          </div>

        </div>
      </div>

      <div className="grid gap-4">
      </div>
    </main>
  );
}
