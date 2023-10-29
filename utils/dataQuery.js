import supabase from "./supabase";

const getCurrentUser = async () => {
  // grab the session from supabase (which handles all authentication)
  const session = await supabase.auth.getSession();
  // if a user property exists in the session.data.session object

  if (session?.data?.session?.user) {
    //grab from the meta table we created for the current logged
    // in user, and attach it to the user object under the key
    // barge meta, this is so we can access for the current user's
    // name and slug
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", session.data.session.user.id)
      .single();
    // here we take the user from the session.data.session
    // object and attach to it a property bargeMeta
    // that holds the name and slug (and some other info
    // that is not important)

    if (error) {
      return {
        data: null,
        error: error.message,
      };
    }

    const user = { ...session.data.session.user, ListoMeta: data };

    return {
      data: user,
      error: null,
    };
  }

  return {
    data: null,
    error: null,
  };
};

//Fetches current id ; VITAL for url links
const getCurrentID = async () => {
  const session = await supabase.auth.getSession();
  if (session?.data?.session?.user) {
    //Grabs current session data and returns equivalent current user id
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", session.data.session.user.id)
      .single();

    if (error) {
      return {
        data: null,
        error: error.message,
      };
    }

    return data.id;
  }
};

// register a user//
/**
 * Register a user
 * @param {*} email
 * @param {*} first_name
 * @param {*} last_name
 * @param {*} username
 * @param {*} password
 * @returns plain old javascript object with success, message and optionally, the rest of the addMetaResponse.data object
 */
const registerUser = async (
  email,
  first_name,
  last_name,
  username,
  password
) => {
  const { data, error } = await supabase
    .from("profile") //table we want to select
    .select("*")
    .eq("username", username);
  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  if (data.length > 0) {
    return {
      success: false,
      message: "Username already exists",
    };
  }

  const authResponse = await supabase.auth.signUp({
    email,
    password,
  });

  if (authResponse.error) {
    return {
      success: false,
      message: authResponse.error.message,
    };
  }

  if (authResponse.data.user) {
    const addMetaResponse = await supabase
      .from("profile")
      .insert([
        { id: authResponse.data.user.id, username, first_name, last_name },
      ]);

    if (addMetaResponse.error) {
      return {
        success: false,
        message: addMetaResponse.error.message,
      }; 
    }
    return {
      success: true,
      message:
        "Registration successful, please wait a few moments to be taken to the login page",
      ...addMetaResponse.data,
    };
  }

  return {
    success: false,
    message: "An unknown error has occurred",
  };
};

/**
 * Log in a user
 * @param {*} email
 * @param {*} password
 * @returns plain old javascript object with success, message and optionally, the rest of the addMetaResponse.data object
 *
 * NOTE, it previously responded with error as the name of the key, it was renamed to message
 * for consistency
 */
const loginUser = async (email, password) => {
  const authResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authResponse.error) {
    return {
      success: false,
      message: authResponse.error,
    };
  }

  if (authResponse.data.user) {
    const meta = await supabase
      .from("profile")
      .select("*")
      .eq("id", authResponse.data.user.id);

    if (meta.error) {
      return {
        success: false,
        message: meta.error,
      };
    }
    return {
      ...authResponse,
      meta,
      success: true,
    };
  }

  return {
    success: false,
    message: "An unknown error has occurred",
  };
}; //End of login user

//Log out a user
const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error logging out:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Logged out successfully",
  };
}; //End of logoutUser

const getUserByUsername = async (username) => {
  const { data, error } = await supabase
    .from("profile")
    .select("id")
    .eq("name", username)
    .limit(1)
    .single();
  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
};

const getWalletById = async (walletId) => {
  const { data, error } = await supabase
    .from("wallet")
    .select("*")
    .eq("id", walletId).single();
  if (error) {
    return {
      success: false,
      error,
    };
  }

  return { success: true, data };
};

const getWallets = async (userId) => {
  const { data, error } = await supabase
    .from("wallet")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.log(error);
    return {
      success: false,
      error,
    };
  }

  return { success: true, data };

};

const addNewWallet = async (
  user_id,
  balance,
  name,
  description
) => {
  //linkRequestData.data = null;
  const insertResponse = await supabase.from("wallet").insert({
    user_id,
    balance,
    name,
    description
  });
  if (insertResponse.error) {
    return {
      success: false,
      error: insertResponse.error,
    };
  }
  return {
    success: true,
    message: "successfully added",
    data: insertResponse.data,
  };
};


/*






//Checks if a list_id matches a specific user_id. Returns a boolean
const ifOwnList = async (listId, userId) => {
  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("list_id", listId);

  let foundMatchingUserId = false;

  data.forEach((entry) => {
    if (entry.user_id === userId) {
      foundMatchingUserId = true;
    }
  });

  return foundMatchingUserId;
};



const updateList = async (
  userId,
  listTitle,
  listItem,
  listOrder,
  username,
  isChecked,
  listId
) => {
  try {
    const { data, error } = await supabase
      .from("lists")
      .update({
        list_title: listTitle,
        list_item: listItem,
        //list_order: listOrder,
        username: username,
        is_checked: isChecked,
      })
      .eq("list_id", listId)
      .eq("list_order", listOrder);

    if (error) {
      // Handle error
      console.error(error);
    } else {
      // Update successful
      console.log("List updated successfully:", data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const deleteItems = async (listId, listOrder) => {
  try {
    const { data, error } = await supabase
      .from("lists")
      .delete()
      .eq("list_id", listId)
      .eq("list_order", listOrder);

    if (error) {
      // Handle error
      console.error(error);
    } else {
      // Update successful
      console.log("List updated successfully:", data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const updateListItems = async (listItems) => {
  try {
    const { data, error } = await supabase
      .from("lists")
      .upsert(listItems, { onConflict: ["list_id"] });

    if (error) {
      // Handle error
      console.error("Error updating list items:", error);
    } else {
      // Update successful
      console.log("List items updated successfully:", data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const getLatestUsers = async (num = 5) => {
  const { data, error } = await supabase
    .from("profile")
    .select("username, user_id")
    .order("created_at", { ascending: false })
    .limit(num);

  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
};
*/
export {
  //getLists,
 // ifOwnList,
 // getListItems,
  addNewWallet,
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
  getCurrentID,
  getUserByUsername,
  getWalletById,
  getWallets
 // updateList,
 // deleteItems,
  //updateListItems,
 // getLatestUsers,
};