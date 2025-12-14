import { create } from "zustand";
import axios from "axios";

const ROLES = [
    "IELTS Preparation Expert",
    "Advanced Speaking Coach",
    "Grammar & Writing Specialist",
    "Business English Trainer",
    "Academic English Mentor",
    "Kids and Teens English Educator",
    "TOEFL iBT Specialist",
    "Presentation Skills Coach",
    "Pronunciation Correction Expert",
];

const BIOS = [
    "Berhasil membantu lebih dari 300 siswa mencapai skor target 7.0+ di IELTS Academic. Fokus pada strategi Writing Task 2.",
    "Spesialis dalam mengurangi aksen, meningkatkan intonasi, dan mencapai kelancaran bicara tingkat C1/C2.",
    "Menguasai kaidah grammar kompleks dan berfokus pada pelatihan penulisan esai, proposal, dan email profesional.",
    "Berpengalaman melatih tim korporat dalam komunikasi lintas budaya, negosiasi, dan presentasi bisnis.",
    "Mendampingi mahasiswa pascasarjana dalam penulisan tesis/disertasi, presentasi ilmiah, dan publikasi jurnal.",
    "Menggunakan metode pengajaran yang interaktif dan menyenangkan (storytelling & game-based learning) untuk usia 7-16 tahun.",
    "Fokus pada teknik integrasi skill dan strategi tes untuk mencapai skor maksimal di TOEFL iBT.",
    "Melatih klien untuk memberikan presentasi yang berdampak dan meyakinkan di lingkungan internasional.",
    "Menggunakan analisis fonetik untuk membantu siswa mengidentifikasi dan memperbaiki kesalahan pengucapan yang umum.",
];

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    pictureUrl: string;
    role: string;
    bio: string;
}

interface TeamState {
    teams: TeamMember[];
    isLoading: boolean;
    error: string | null;
    fetchTeams: (count: number) => Promise<void>;
}

export const useTeamStore = create<TeamState>((set) => ({
    teams: [],
    isLoading: false,
    error: null,

    fetchTeams: async (count = 9) => {
        set({ isLoading: true, error: null });

        const RANDOM_USER_API = `https://randomuser.me/api/?results=${count}&inc=name,email,picture,login`;

        try {
            const response = await axios.get(RANDOM_USER_API);

            const mappedTeams: TeamMember[] = response.data.results.map((user: any, index: number) => {
                
                const roleIndex = index % ROLES.length; 

                return ({
                    id: user.login.uuid,
                    name: `${user.name.first} ${user.name.last}`,
                    email: user.email,
                    pictureUrl: user.picture.large,
                    role: ROLES[roleIndex], 
                    bio: BIOS[roleIndex],  
                });
            });

            set({
                teams: mappedTeams,
                isLoading: false
            });

        } catch (error) {
            const msg = axios.isAxiosError(error)
                ? error.message
                : "Gagal memuat data tim.";

            set({ error: msg, isLoading: false });
        }
    },
}));