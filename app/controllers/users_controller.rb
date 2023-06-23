class UsersController < ApplicationController
wrap_parameters format: []
    skip_before_action :authenticate_user, only: [:create]

    # POST '/signup'
    def create 
        @user = User.create(user_params)
        if @user.valid?
            session[:user_id] = @user.id 
            render json: @user, status: :created
        else 
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity 
        end

    end 

    # GET '/me'
    def show
        # user = User.find(session[:user_id]) 
        render json: @current_user, status: :ok
    end 


    def update
    end 


    def destroy
    end 

    private 

    def user_params
        params.require(:user).permit(:username, :email, :password, :admin)
    end 

end

#------------------------------------------
# Let's walk through the code:

# 1. `UsersController` is a controller responsible for handling CRUD operations related to users.

# 2. The `skip_before_action` skips the `authenticate_user` filter for the `create` action. This means that authentication is not required for the user creation endpoint.

# 3. The `create` action handles the POST request to `/signup`. It creates a new user with the parameters received (`User.create(user_params)`). If the user is valid and successfully saved, it sets the `user_id` in the session to the created user's ID (`session[:user_id] = @user.id`). Then, it renders a JSON response with a success message and a status of 201 (Created). If the user is invalid and fails to save, it renders a JSON response with the user's error messages and a status of 422 (Unprocessable Entity).

# 4. The `show` action handles the GET request to `/me`. It retrieves the current user (`current_user`) and assigns it to the `@user` instance variable. Then, it renders the user in JSON format using the `UserSerializer` and a status of 200 (OK).

# 5. The `update` and `destroy` actions are currently empty and need to be implemented. These actions are typically responsible for updating and deleting a specific user.

# 6. The `user_params` method is a private method that defines the permitted parameters for creating and updating a user. It uses `params.require(:user).permit(...)` to specify which parameters are allowed.

# In summary, the `UsersController` handles the user creation, retrieval, updating, and deletion operations. It allows creating a new user, fetching the current user's details, and provides empty methods for updating and deleting users. The actions return JSON responses with appropriate status codes to communicate the results of the operations.

# line 2: This line indicates that the `authenticate_user` method (defined in the ApplicationController) should be skipped for the `create` action. This allows unathenticated access to the `create` action, typically used for user registration. 

# line 5: The `create` action handles the registration of a new user. It initializes a new `User` object using the `user_params` method to extract the required params from the request. If the user is successfully saved to the database, their ID is stored in the session for authentication purposes, and a success message is returned. If the user fails to save (due to validation errors), an error message with the validation errors is returned. 

# After successfully saving a new user (@user.save), the user's ID (@user.id) is stored in the session hash with the key :user_id. This sets a session variable for the currently logged-in user.
# By storing the user ID in the session, it becomes accessible and can be used to identify the user in subsequent requests. This is a common technique for session-based authentication. In subsequent requests, you can retrieve the user ID from the session to identify the authenticated user and perform authorization checks if needed.

# line 7: after successfully creating the user, we store the `user_id` in the session using `session[:user_id] = user.id`. This sets a session cookie containing the user's ID, which allows the server to identify the user on subsequent requests. 

# line 8: every single request is individual, that's what we mean when HTTP is stateless. Every subsequent request we make is treated as a separate request. So we need to share our cookies, but in order to do that we need to share our user's session. Line 8 is what remembers our user / keeps our user logged in. Take session hash and populate it with a key (key is arbitrary. conventionally we'll see it as :user_id) and set value as newly created user.id. Now it remembers my user and so everywhere it goes it's going to share this cookie with each subsequent request. Else if something goes wrong, render out some errors. 

# line 17: In the `show` action, the `current_user` method is used to retrieve the authenticated user based on the `:user_id` stored in the session. The `current_user` method, which is defined in the `ApplicationController`, uses the `:user_id` stored in the session to find and return the corresponding `User` object. 

#   def current_user
#     @current_user ||= User.find_by_id(session[:user_id])
#   end 

# line 34: even though our column name is password_digest in our DB, we permit :password and :password_confirmation 

# line 18: Instead of having to find a user again in `show`, any place that i'm trying to find a user, call `current_user` instead. This way, we are checking the user in session...it saves us a query and it's organized in another method. 



#-----------------------------------
# In Ruby on Rails, there are two common ways to render JSON responses: using a serializer or directly rendering the JSON object.

# 1. Using a serializer:
#    - When you use a serializer like `UserSerializer`, it allows you to customize the JSON representation of the `user` object.
#    - The `UserSerializer.new(user)` call creates a serializer instance for the `user` object.
#    - By calling `.to_json` on the serializer instance, you get a JSON string representation of the serialized `user` object.
#    - This approach is useful when you need to include additional attributes or customize the JSON output, such as including associations, excluding certain attributes, or adding computed properties.
#    - Example usage: `render json: UserSerializer.new(user).to_json`

# 2. Directly rendering the JSON object:
#    - When you directly render the JSON object, Rails converts the `user` object into JSON format without using a serializer.
#    - The `render json: user` call serializes the `user` object into JSON format and sends it as the response.
#    - This approach is simpler and suitable when you don't need to customize the JSON output and want to use the default serialization behavior provided by Rails.
#    - Example usage: `render json: user`

# In summary, use a serializer like `UserSerializer` when you need to customize the JSON representation of the object, and use the direct rendering of the JSON object (`render json: user`) when the default serialization behavior provided by Rails is sufficient.

# # In Ruby on Rails, instance variables (`@variable_name`) are typically used when you need to share data between different parts of the controller, such as between controller actions and views. Instance variables are accessible within the controller and can be accessed in the corresponding view templates.

# # On the other hand, local variables (without the `@` symbol) are used when you only need to store and use data within a specific method or block of code. Local variables have a limited scope and are not accessible outside of that particular context.

# # Here are some common scenarios where you might use instance variables:

# # 1. Passing data to views: Instance variables set in controller actions can be accessed in the corresponding view templates, allowing you to share data between the controller and the view.

# # 2. Sharing data between controller actions: Instance variables set in one action can be accessed in another action within the same controller. This can be useful when you need to pass data between different actions, such as when redirecting from one action to another.

# # 3. Sharing data with before/after filters: Instance variables can be set in `before_action` or `after_action` filters and then accessed in the corresponding controller actions. This allows you to share common data or perform preprocessing before executing specific actions.

# # On the other hand, local variables are typically used when you only need to store and use data within a specific method or block of code, and there is no need to access that data in other parts of the controller or views.

# It's important to note that the choice between using an instance variable or a local variable depends on the specific requirements of your application and the scope of the data you are working with. Always consider the context and scope in which the data needs to be accessed when deciding whether to use an instance variable or a local variable.

## Params.permit vs. Params.require.permit 
# In Rails, `params.require(:user).permit` and `params.permit` serve different purposes in the context of strong parameters:

# 1. **params.require(:user).permit**: This syntax is used when you have nested parameters and want to whitelist only specific attributes of a nested resource. It is typically used when creating or updating an associated resource within the context of another resource.

# For example, if you have a nested resource `user` that has an associated `profile`, you can use `params.require(:user).permit(:name, profile_attributes: [:age, :bio])` to whitelist the `name` attribute of the `user` resource and the `age` and `bio` attributes of the associated `profile` resource.

# 2. **params.permit**: This syntax is used when you want to whitelist attributes at the top level without considering any nested parameters. It is commonly used when creating or updating a resource that does not have any associated nested resources.

# For example, if you have a simple resource like `user` without any nested associations, you can use `params.permit(:name, :email)` to whitelist the `name` and `email` attributes of the `user` resource.

# In summary, `params.require(:user).permit` is used when dealing with nested resources and allows you to specify the attributes of both the parent resource and its associated resources. On the other hand, `params.permit` is used when dealing with a single resource without any nested associations, allowing you to whitelist attributes at the top level.

# It's important to use the appropriate syntax based on your specific requirements to ensure that only the intended attributes are permitted for mass assignment and protect against unauthorized attribute modification.

    # def create 
    #     user = User.create(user_params)
    #     if user.valid? 
    #         session[:user_id] = user.id 
    #         render json: user, status: :ok 
    #     else 
    #         render json: { errors: user.errors.full_messages }, status: :unprocessable_entity 
    #     end 
    # end 

    # In the code you provided, the use of instance variables (`@user`) is appropriate and necessary.

# Here's why you need instance variables in this context:

# 1. `@user` in the `create` action: The instance variable `@user` is used to store the newly created `User` object. It allows you to access this object in the subsequent conditional statements (`if @user.save`) and in the response rendering. It ensures that the user object is accessible within the entire method scope.

# 2. `@user` in the `show` action: The instance variable `@user` is used to store the authenticated user retrieved by the `current_user` method. It allows you to access the user object and render it as JSON in the response. It ensures that the user information is accessible within the entire method scope.

# 3. `@user` in the `update` and `destroy` actions: Although these actions are empty in the code you provided, you would typically use the `@user` instance variable to retrieve and update or delete the corresponding user record.

# Instance variables are used here to share data across different parts of the controller, such as the conditional statements and response rendering. They allow you to access and manipulate the user object within the entire method scope and ensure consistency in the data used throughout the action.

# Therefore, in this case, using instance variables (`@user`) is necessary for the code to function correctly.