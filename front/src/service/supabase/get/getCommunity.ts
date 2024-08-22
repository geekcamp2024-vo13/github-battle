import { CommunityType } from "@/constants/communityType"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export const getCommunity = async (offset: number): Promise<CommunityType[]> => {
    const supabase = createClientComponentClient()

    try {
        const { data, error } = await supabase
            .from('communities')
            .select('*')
            .order('created_at', { ascending: false })  // 新しいデータから取得
            .range(offset, offset + 20)

        if (error) {
            throw error
        }

        return (data as CommunityType[]).reverse();  // このreverseを消せば配列の順序を逆にできる
    } catch (error) {
        console.error('Error fetching initial data:', error)
        return []
    }
}