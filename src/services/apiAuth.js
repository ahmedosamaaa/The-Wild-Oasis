import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  // const { user } = supabase.auth.getSession();
  // if (user) {
  //   // User is already authenticated, do not sign up again
  //   throw new Error("User is already authenticated.");
  // }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  console.log(data);
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  // console.log("sessiona", session.session);
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  // console.log(data);

  if (error) throw new Error(error.message);
  // console.log(data);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
