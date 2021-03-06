# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import jobs_pb2 as jobs__pb2


class JobServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.RunJob = channel.unary_unary(
                '/JobService/RunJob',
                request_serializer=jobs__pb2.JobRunRequest.SerializeToString,
                response_deserializer=jobs__pb2.JobRunResponse.FromString,
                )
        self.GetJobStatus = channel.unary_unary(
                '/JobService/GetJobStatus',
                request_serializer=jobs__pb2.JobStatusRequest.SerializeToString,
                response_deserializer=jobs__pb2.JobStatusResponse.FromString,
                )


class JobServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def RunJob(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetJobStatus(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_JobServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'RunJob': grpc.unary_unary_rpc_method_handler(
                    servicer.RunJob,
                    request_deserializer=jobs__pb2.JobRunRequest.FromString,
                    response_serializer=jobs__pb2.JobRunResponse.SerializeToString,
            ),
            'GetJobStatus': grpc.unary_unary_rpc_method_handler(
                    servicer.GetJobStatus,
                    request_deserializer=jobs__pb2.JobStatusRequest.FromString,
                    response_serializer=jobs__pb2.JobStatusResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'JobService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class JobService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def RunJob(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/JobService/RunJob',
            jobs__pb2.JobRunRequest.SerializeToString,
            jobs__pb2.JobRunResponse.FromString,
            options, channel_credentials,
            call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetJobStatus(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/JobService/GetJobStatus',
            jobs__pb2.JobStatusRequest.SerializeToString,
            jobs__pb2.JobStatusResponse.FromString,
            options, channel_credentials,
            call_credentials, compression, wait_for_ready, timeout, metadata)
