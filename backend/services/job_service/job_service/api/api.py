from jobs_pb2_grpc import JobServiceServicer
from jobs_pb2 import JobRunResponse, JobStatusResponse, JobStatus

from ..jobs.defs import JOBNAME_JOBDEF_MAP


class JobServicer(JobServiceServicer):
    def RunJob(self, request, context):
        job_response = JobRunResponse()
        job_response.launchSuccess = True

        if not request.name:
            print("No job name received")
            job_response.launchSuccess = False
        else:
            if request.name not in JOBNAME_JOBDEF_MAP:
                print("Job requested {0} is not defined".format(request.name))
                job_response.launchSuccess = False
            else:
                task_res = JOBNAME_JOBDEF_MAP[request.name]()
                job_response.identifier = task_res.id

        return job_response

    def GetJobStatus(self, request, context):
        return JobStatusResponse()
