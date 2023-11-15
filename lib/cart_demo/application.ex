defmodule CartDemo.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      CartDemoWeb.Telemetry,
      {DNSCluster, query: Application.get_env(:cart_demo, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: CartDemo.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: CartDemo.Finch},
      # Start a worker by calling: CartDemo.Worker.start_link(arg)
      # {CartDemo.Worker, arg},
      # Start to serve requests, typically the last entry
      CartDemoWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: CartDemo.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    CartDemoWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
