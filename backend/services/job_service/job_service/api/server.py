import grpc
from concurrent import futures

from api import JobServicer

# generated proto python modules
from jobs_pb2_grpc import add_JobServiceServicer_to_server


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    add_JobServiceServicer_to_server(JobServicer(), server)

    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    serve()