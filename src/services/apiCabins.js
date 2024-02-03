import supabase, { supabaseUrl } from "./supabase";

export async function getCapins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log("hemo", newCabin, "id", id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  console.log("zz", hasImagePath);

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  console.log(imagePath);
  //1-Create/Edit cabin
  let query = supabase.from("cabins");

  //A-Create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B-Edit cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  // console.log(query);
  if (error) {
    console.error(error);
    throw new Error("cabins could not be created");
  }

  //2-Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    //bucketName
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3-Delete the cabin if there was an error in uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "cabins image could not be uploaded and tthe cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabins could not be deleted");
  }
  return data;
}
