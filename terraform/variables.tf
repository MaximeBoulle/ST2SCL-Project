variable "project_id" {
  description = "The GCP Project ID"
  type        = string
  default     = "carrental-project-123"
}

variable "region" {
  description = "The GCP region"
  type        = string
  default     = "europe-west1"
}

variable "gke_num_nodes" {
  default     = 2
  description = "number of gke nodes"
}
