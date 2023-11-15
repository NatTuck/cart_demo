defmodule CartDemoWeb.PageController do
  use CartDemoWeb, :controller

  def home(conn, _params) do
    render(conn, :home, layout: false)
  end
end
