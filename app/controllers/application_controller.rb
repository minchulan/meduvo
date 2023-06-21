class ApplicationController < ActionController::API
  before_action :authenticate_user, only: [:create]
  include ActionController::Cookies

  def current_user #memoization
    @current_user ||= User.find_by_id(session[:user_id])
  end 

  private 
  
  def authenticate_user #checking if a user is logged in only
    return render json: { error: {User: "Unauthorized" }}, status: :unauthorized unless @current_user
  end 

  ## Admin status 
  # def is_authorized?
  #   permitted = current_user.admin? 
  #   render json: { errors: {User: "Does not have admin permissions"}}, status: :forbidden unless permitted 
  # end 

end

# ---------------------
# Let's walk through the code: 
# 1. `ApplicationController` is the base controller class that other controllers in your Rails application will inherit from. It is defined as a subclass of `ActionController::API`.

# 2. The `before_action :authenticate_user` line specifies that the `authenticate_user` method should be called before every action in the controllers that inherit from `ApplicationController`. This ensures that the user is authenticated before accessing any protected routes.

# 3. `include ActionController::Cookies` is used to include cookie-related functionality in the controller. This allows you to use cookies for storing session data.

# 4. The `current_user` method is defined to find and return the currently authenticated user based on the `user_id` stored in the session. It uses memoization to avoid unnecessary database queries if the `@current_user` instance variable has already been set.

# 5. The `authenticate_user` method is responsible for authenticating the user. It checks if the `user_id` key is present in the session. If it is not present, it returns a JSON response with an "Unauthorized" error message and a status of 401 (unauthorized). This ensures that only authenticated users can access the protected routes.

# In summary, this code sets up an authentication mechanism in your Rails application using sessions and cookies. The `current_user` method retrieves the currently authenticated user based on the `user_id` stored in the session. The `authenticate_user` method ensures that the user is authenticated before accessing protected routes and returns an unauthorized response if the user is not authenticated.




# In line 10, the current_user method retrieves the currently authenticated user based on the user_id stored in the session. It uses the find_by method to find the user by their ID.

# The `authorize_request`` method is used as a before-action filter to ensure that the user is authenticated before accessing certain actions or pages. If the current_user method returns nil, indicating that no user is currently authenticated, error message is displayed. [maybe redirect user to the login page? redirect_to login_path]

# def authorize_request
#   redirect_to [LOGIN] unless current_user 
# end 

# the `authorize_request` method checks if the `user_id` is present in the session. If the `user_id` is not found, it renders an unauthorized response. 

# unless current_user: This condition checks whether the current_user method returns a truthy value. If current_user is nil or false, it means that no user is currently authenticated.

# the `current_user` method retrieves the user based on the `user_id` stored in the session. It uses memoization to avoid unnecessary database queries if the `current_user` has already been fetchd. 

# the `logged_in?` method checks if a user is currently logged in by verifying if `current_user` is present. 

# The ApplicationController is the base controller for your Rails application. It is inherited by all other controllers in your application.

# The before_action callback authorize_request is invoked before every controller action, ensuring that the user is authorized.

# The authorize_request method checks if the user_id is present in the session. If the user_id is not found, it renders a JSON response with an "Unauthorized" error and sets the HTTP status code to 401 (unauthorized).

# The current_user method retrieves the currently logged-in user based on the user_id stored in the session. It uses memoization to avoid unnecessary database queries if the current_user has already been fetched.

# The logged_in? method checks if a user is currently logged in by verifying if current_user is present. It returns true if a user is logged in and false otherwise.

# By using session-based authentication, the user's session is maintained on the server-side, and the user is identified by the user_id stored in the session. This allows you to authenticate and authorize the user without relying on JWT or other tokens.

# before_action is used to define filters that run before specific actions, while skip_before_action is used to exclude specific actions from the execution of a defined filter. These methods allow you to control the execution order and selectively apply filters to actions in your controller.

# We want to restrict all routes except for our sessions login, and user signup. 
