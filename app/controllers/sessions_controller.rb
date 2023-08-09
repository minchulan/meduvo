class SessionsController < ApplicationController
  skip_before_action :authenticate_user, only: [:create, :destroy]

  # login -- POST '/login', to: "sessions#create"
  def create
    user = User.find_by_email(params[:email])
    # if user && user.authenticate
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :ok
    else
      render json: { errors: 'Incorrect Username or Password' }, status: :unauthorized
    end

  end

  # logout -- DELETE '/logout', to: "sessions#destroy"
  def destroy
    session.delete(:user_id)
    head :no_content
    # Clear the memoized current user 
    current_user = nil 
  end
  
end





#---------------------------
#  when you call current_user in other controllers (e.g., UsersController or SessionsController), you are just accessing the memoized @current_user variable, and you don't need to use the @ symbol.
# # in the `SessionsController`, you handle user authentication and session management effectively, returning proper responses for successful and unsuccessful login attempts.

# # Let's walk through the code:
# 1. `SessionsController` is a controller responsible for handling user sessions, specifically user login and logout.

# 2. `skip_before_action :authenticate_user, only: :create` skips the authentication check for the `create` action, allowing unauthenticated users to access the login route.

# 3. The `create` action handles the user login process. It receives the user's email and password as parameters from the login form.

# 4. The code `user = User.find_by_email(params[:email])` looks up the user record in the database based on the provided email.

# 5. `user&.authenticate(params[:password])` calls the `authenticate` method on the user object with the provided password. If the user exists and the authentication is successful, the user is authenticated.

# 6. If the user is authenticated, `session[:user_id] = user.id` sets the `user_id` value in the session to the ID of the authenticated user. This allows the server to keep track of the logged-in user.

# 7. The line `render json: UserSerializer.new(user), status: :accepted` returns a JSON response with the serialized user object. `UserSerializer` is a serializer that formats the user object according to specific rules. The status code is set to 202 (accepted) to indicate a successful login.

# 8. If the user is not authenticated, the `else` block is executed. It returns a JSON response with an "Not authorized" error message and a status of 401 (unauthorized).

# 9. The `destroy` action handles the user logout process. It clears the `user_id` value from the session by calling `session.delete(:user_id)`. This effectively logs out the user.

# 10. `head :no_content` returns an empty response with a status of 204 (no content) to indicate a successful logout.

# In summary, the `SessionsController` provides endpoints for user login and logout. The `create` action authenticates the user and sets the `user_id` in the session, while the `destroy` action clears the `user_id` from the session to log out the user.




# line 6: # if user && user.authenticate(params[:password])
# line 6: .valid? is only if we want to persist to DB 
# the way we authenticate them is by passing in the password user submitted

# In this example, the create action handles user login. It finds the user by the provided email, authenticates the password, and if successful, stores the user_id in the session using session[:user_id] = user.id.

# The destroy action handles user logout. It simply clears the user_id from the session by setting it to nil.

# line 9: in this line, I wrapped the serialized user object with a user key in the JSON response. This provides a consistent structure in the JSON response and makes it easier to access the user data on the client side if needed. The status code remains the same, set to :accepted to indicate a successful login.