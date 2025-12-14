interface ConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDelete = ({ onConfirm, onCancel }: ConfirmDeleteProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Yakin ingin menghapus blog ini?
        </h3>

        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Batal
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;