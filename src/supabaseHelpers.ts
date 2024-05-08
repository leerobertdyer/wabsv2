import { supabase } from "./supabaseClient";

async function updateSupabaseColumn(table: string, columnToUpdate: string, newValue: string, id: string) {
    try {
        const { data, error } = await supabase
            .from(table)
            .update({ [columnToUpdate]: newValue })
            .eq("user_id", id);
        if (error) {
            console.error('Supabase Update Error:', error.message);
            return;
        }
        if (data) {
            console.log('Column Update Success:', data);
        } else {
            console.warn('Column Update Warning: No data returned. Might be fine.');
        }
    } catch (error) {
        console.error('Supabase Update Error:', error);
    }
}

async function deleteASong(publicUrl: string, storagePath: string) {
    //Delete from the table 
    try {
        console.log('starting to delete');
        const { error } = await supabase
            .from('songs')
            .delete()
            .eq("publicUrl", publicUrl)
        if (error) {
            console.error('Supabase Delete Error:', error.message);
            return;
        }
        console.log('Row Deleted Successfully');
    } catch (error) {
        console.error('Supabase Delete Error:', error);
    }
    //Delete from the storage UPDATE THIS ONE
    console.log('now deleting from storage')
    try {
        const { error } = await supabase
            .storage
            .from('songs')
            .remove([storagePath]);
        if (error) {
            console.error('Supabase Storage Delete Error:', error.message);
            return;
        }
    } catch (error) {
        console.error('Supabase Storage Delete Error:', error);
    }
}

export { updateSupabaseColumn, deleteASong };